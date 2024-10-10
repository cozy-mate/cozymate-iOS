import React from 'react';

import first from '@assets/characterItem/1.svg';
import third from '@assets/characterItem/3.svg';
import fifth from '@assets/characterItem/5.svg';
import sixth from '@assets/characterItem/6.svg';
import ninth from '@assets/characterItem/9.svg';
import second from '@assets/characterItem/2.svg';
import fourth from '@assets/characterItem/4.svg';
import eighth from '@assets/characterItem/8.svg';
import tenth from '@assets/characterItem/10.svg';
import seventh from '@assets/characterItem/7.svg';
import twelfth from '@assets/characterItem/12.svg';
import eleventh from '@assets/characterItem/11.svg';
import fifteenth from '@assets/characterItem/15.svg';
import sixteenth from '@assets/characterItem/16.svg';
import thirteenth from '@assets/characterItem/13.svg';
import fourteenth from '@assets/characterItem/14.svg';

export const getProfileImage = (persona: number, width: number, height: number) => {
  const items = [
    { index: 1, icon: first },
    { index: 2, icon: second },
    { index: 3, icon: third },
    { index: 4, icon: fourth },
    { index: 5, icon: fifth },
    { index: 6, icon: sixth },
    { index: 7, icon: seventh },
    { index: 8, icon: eighth },
    { index: 9, icon: ninth },
    { index: 10, icon: tenth },
    { index: 11, icon: eleventh },
    { index: 12, icon: twelfth },
    { index: 13, icon: thirteenth },
    { index: 14, icon: fourteenth },
    { index: 15, icon: fifteenth },
    { index: 16, icon: sixteenth },
  ];

  const selectedItem = items.find((item) => item.index === persona);

  if (!selectedItem) return null;

  const IconComponent = selectedItem.icon;

  return <IconComponent width={width} height={height} />;
};
