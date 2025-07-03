import React from 'react';
import { Animated } from 'react-native';

import CustomMultiSelect from '@/components/common/customInput/customMultiSelect';
import CustomSelect from '@/components/common/customInput/customSelect';
import CustomTimeSelect from '@/components/common/customInput/customTimeSelect';

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
        <CustomSelect title={title} value={value} items={items} handleValue={handleValue} />
      )}
      {type === 'SELECT' && (
        <CustomMultiSelect title={title} value={value} items={items} handleValue={handleValue} />
      )}
      {type === 'TIME' && <CustomTimeSelect title={title} value={value} onChange={handleValue} />}

      {type === 'GRID' && (
        <CustomSelect
          title={title}
          value={value}
          items={items}
          handleValue={handleValue}
          isGrid={true}
        />
      )}
    </Animated.View>
  );
};

export default AnimatedFieldComponent;
