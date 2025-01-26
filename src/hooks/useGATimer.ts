import { useEffect } from 'react';

import { sendScreenEvent } from '@utils/ga/sendScreenEvent';

import { initTimer } from '@utils/ga/sendTimerEvent';

const useGATimer = () => {
  useEffect(() => {
    sendScreenEvent('온보딩 시작');
    initTimer();
  }, []);
};

export default useGATimer;
