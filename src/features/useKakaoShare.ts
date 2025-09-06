import { useEffect, useState } from "react";

declare global {
  interface Window {
    Kakao: {
      init: (apiKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
    };
  }
}

interface KakaoShareOptions {
  objectType: "feed" | "list" | "location" | "commerce" | "text";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

interface ShareData {
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
}

interface UseKakaoShareReturn {
  isReady: boolean;
  shareToKakao: (data: ShareData) => void;
  error: string | null;
}

export const useKakaoShare = (): UseKakaoShareReturn => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const kakaoApiKey = import.meta.env.VITE_KAKAO_API_JAVASCRIPT_KEY;

  useEffect(() => {
    const initializeKakao = async () => {
      try {
        // API 키 확인
        if (!kakaoApiKey) {
          setError("카카오 API 키가 설정되지 않았습니다.");
          return;
        }

        // SDK 로드 대기
        const waitForKakaoSDK = () => {
          return new Promise<void>((resolve, reject) => {
            const checkKakao = () => {
              if (window.Kakao) {
                resolve();
              } else {
                // 최대 10초 대기
                setTimeout(() => {
                  if (window.Kakao) {
                    resolve();
                  } else {
                    reject(new Error("카카오 SDK 로드 실패"));
                  }
                }, 100);
              }
            };
            checkKakao();
          });
        };

        await waitForKakaoSDK();

        // 카카오 초기화
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoApiKey);
        }

        setIsReady(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "카카오 초기화 실패");
        setIsReady(false);
      }
    };

    initializeKakao();
  }, [kakaoApiKey]);

  const shareToKakao = (data: ShareData) => {
    if (!isReady || !window.Kakao) {
      setError("카카오톡 공유 기능이 준비되지 않았습니다.");
      return;
    }

    try {
      const shareOptions: KakaoShareOptions = {
        objectType: "feed",
        content: {
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          link: {
            mobileWebUrl: data.url || window.location.href,
            webUrl: data.url || window.location.href,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: data.url || window.location.href,
              webUrl: data.url || window.location.href,
            },
          },
        ],
      };

      window.Kakao.Share.sendDefault(shareOptions);
      setError(null);
    } catch (err) {
      setError("카카오톡 공유 중 오류가 발생했습니다.");
      console.error("Kakao share error:", err);
    }
  };

  return {
    isReady,
    shareToKakao,
    error,
  };
};
