import React from 'react';
import { Animated } from 'react-native';

import CustomGridRadioComponent from './customGridRadio';
import CustomRadioComponent from './customRadio';
import CustomSelectComponent from './customSelect';
import CustomTimeSelectComponent from './customTimeSelect';

interface AnimatedFieldComponentProps {
  show: boolean;
  valueCheck: boolean;
  animation: { opacity: any; translateY: any };

  type: 'RADIO' | 'SELECT' | 'TIME' | 'GRID';
  title: string;
  value: any;
  items?: any;
  handleValue: any;
}

const AnimatedFieldComponent: React.FC<AnimatedFieldComponentProps> = ({
  show,
  valueCheck,
  animation,
  type,
  title,
  value,
  items,
  handleValue,
}) => {
  if (!show && !valueCheck) return null;

  return (
    <Animated.View
      style={{
        opacity: valueCheck ? 1 : animation.opacity,
        transform: [{ translateY: valueCheck ? 0 : animation.translateY }],
      }}
    >
      {type === 'RADIO' && (
        <CustomRadioComponent title={title} value={value} items={items} handleValue={handleValue} />
      )}
      {type === 'SELECT' && (
        <CustomSelectComponent
          title={title}
          value={value}
          items={items}
          handleValue={handleValue}
        />
      )}
      {type === 'TIME' && (
        <CustomTimeSelectComponent title={title} value={value} onChange={handleValue} />
      )}

      {type === 'GRID' && (
        <CustomGridRadioComponent
          title={title}
          value={value}
          items={items}
          handleValue={handleValue}
        />
      )}
    </Animated.View>
  );
};

export default AnimatedFieldComponent;
