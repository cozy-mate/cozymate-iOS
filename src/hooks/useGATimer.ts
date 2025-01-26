import { useEffect } from 'react';

import { sendScreenEvent } from '@utils/ga/sendScreenEvent';

import { initTimer } from '@utils/ga/sendTimerEvent';

const useGATimer = () => {
  useEffect(() => {
    try {
      sendScreenEvent('온보딩 시작');
      initTimer();
    } catch (e) {
      //console.error('useGATimer error: ', e);
    }
  }, []);
};

export default useGATimer;
