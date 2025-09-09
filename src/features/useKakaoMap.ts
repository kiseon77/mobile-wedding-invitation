import { useEffect, useRef, useState, useCallback } from "react";

// 카카오맵 타입 정의
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: MapOptions) => KakaoMap;
        Marker: new (options: MarkerOptions) => KakaoMarker;
        InfoWindow: new (options: InfoWindowOptions) => KakaoInfoWindow;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        services: {
          Geocoder: new () => KakaoGeocoder;
        };
        event: {
          addListener: (target: any, type: string, handler: () => void) => void;
        };
      };
    };
  }
}

interface MapOptions {
  center: KakaoLatLng;
  level: number;
}

interface MarkerOptions {
  position: KakaoLatLng;
  map?: KakaoMap;
}

interface InfoWindowOptions {
  content: string;
  position?: KakaoLatLng;
}

interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
  getLevel: () => number;
  setLevel: (level: number) => void;
}

interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
  getPosition: () => KakaoLatLng;
}

interface KakaoInfoWindow {
  open: (map: KakaoMap, marker: KakaoMarker) => void;
  close: () => void;
}

interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: GeocodeResult[], status: string) => void
  ) => void;
}

interface GeocodeResult {
  x: string; // 경도
  y: string; // 위도
  address_name: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface UseKakaoMapProps {
  name: string;
  address: string;
  appKey?: string; // 선택적으로 앱 키를 받을 수 있도록
}

interface UseKakaoMapReturn {
  mapRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  error: string | null;
  coordinates: Coordinates | null;
  openInKakaoMap: () => void;
  openInNaverMap: () => void;
  openInGoogleMap: () => void;
  retry: () => void;
}

const kakaoApiKey = import.meta.env.VITE_KAKAO_API_JAVASCRIPT_KEY;
export const useKakaoMap = ({
  name,
  address,
}: UseKakaoMapProps): UseKakaoMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);

  // 네이버맵에서 열기
  const openInNaverMap = useCallback(() => {
    if (!address) {
      alert("주소 정보가 없습니다.");
      return;
    }

    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(
      address
    )}`;
    window.open(naverMapUrl, "_blank", "noopener,noreferrer");
  }, [address]);

  // 구글맵에서 열기
  const openInGoogleMap = useCallback(() => {
    if (!address) {
      alert("주소 정보가 없습니다.");
      return;
    }

    const googleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapUrl, "_blank", "noopener,noreferrer");
  }, [address]);

  return {
    mapRef,
    isLoading,
    error,
    coordinates,
    openInKakaoMap,
    openInNaverMap,
    openInGoogleMap,
  };
};
