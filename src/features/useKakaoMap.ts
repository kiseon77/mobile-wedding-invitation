import { useEffect, useRef, useCallback } from "react";

// Kakao Maps API 타입 정의
declare global {
  interface Window {
    kakao: {
      maps: {
        Map: new (container: HTMLElement, options: any) => any;
        LatLng: new (lat: number, lng: number) => any;
        Marker: new (options: any) => any;
      };
    };
  }
}

interface MapOptions {
  lat: number;
  lng: number;
  level?: number;
}

interface MarkerOptions {
  lat: number;
  lng: number;
  title?: string;
  clickable?: boolean;
}

interface AdvancedKakaoMapHook {
  mapRef: React.RefObject<HTMLDivElement | null>;
  map: any | null; // kakao.maps.Map 대신 any 사용
  addMarker: (options: MarkerOptions) => any | null; // kakao.maps.Marker 대신 any 사용
  removeAllMarkers: () => void;
  setCenter: (lat: number, lng: number) => void;
  setLevel: (level: number) => void;
}

export function useKakaoMap({
  lat,
  lng,
  level = 3,
}: MapOptions): AdvancedKakaoMapHook {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null); // kakao.maps.Map 대신 any 사용
  const markersRef = useRef<any[]>([]); // kakao.maps.Marker[] 대신 any[] 사용

  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return;

    if (!window.kakao?.maps) {
      console.error("Kakao Maps API is not loaded");
      return;
    }

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level,
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(container, options);
    mapInstanceRef.current = map;

    // 기본 마커 생성
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
    markersRef.current.push(marker);

    // 클린업 함수
    return () => {
      markersRef.current = [];
      mapInstanceRef.current = null;
    };
  }, [lat, lng, level]);

  const addMarker = useCallback((options: MarkerOptions) => {
    if (!mapInstanceRef.current) return null;

    const markerPosition = new window.kakao.maps.LatLng(
      options.lat,
      options.lng
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      title: options.title,
      clickable: options.clickable || false,
    });

    marker.setMap(mapInstanceRef.current);
    markersRef.current.push(marker);

    return marker;
  }, []);

  const removeAllMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const setCenter = useCallback((lat: number, lng: number) => {
    if (!mapInstanceRef.current) return;

    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    mapInstanceRef.current.setCenter(moveLatLon);
  }, []);

  const setLevel = useCallback((level: number) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setLevel(level);
  }, []);

  return {
    mapRef,
    map: mapInstanceRef.current,
    addMarker,
    removeAllMarkers,
    setCenter,
    setLevel,
  };
}
