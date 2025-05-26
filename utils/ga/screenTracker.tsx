import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

import { useTracker } from '@/providers/TrackerProvider';

export default function ScreenTracker() {
  const pathname = usePathname();
  const { trackScreen } = useTracker();
  const prevScreenRef = useRef<string | null>(null);
  const enterTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (prevScreenRef.current) {
      // 이전 스크린에서 머문 시간(초)
      const duration = Math.round((now - enterTimeRef.current) / 1000);
      // 이전 스크린 타임 측정
      trackScreen(prevScreenRef.current, { duration });
    }
    // 현재 스크린 진입
    trackScreen(pathname);
    prevScreenRef.current = pathname;
    enterTimeRef.current = now;

    // cleanup: 언마운트 시 마지막 스크린 duration 추적
    return () => {
      const end = Date.now();
      if (prevScreenRef.current) {
        const duration = Math.round((end - enterTimeRef.current) / 1000);
        trackScreen(prevScreenRef.current, { duration });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}
