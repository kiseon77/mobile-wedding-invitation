import { useEffect, useRef, useCallback } from "react";

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
  mapRef: React.RefObject<HTMLDivElement>;
  map: kakao.maps.Map | null;
  addMarker: (options: MarkerOptions) => kakao.maps.Marker | null;
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
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return;

    const { kakao } = window as any;
    if (!kakao?.maps) {
      console.error("Kakao Maps API is not loaded");
      return;
    }

    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    mapInstanceRef.current = map;

    // 기본 마커 생성
    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({
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

    const { kakao } = window as any;
    const markerPosition = new kakao.maps.LatLng(options.lat, options.lng);
    const marker = new kakao.maps.Marker({
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

    const { kakao } = window as any;
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
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
