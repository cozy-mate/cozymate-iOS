import React from 'react';
import { View } from 'react-native';

interface OverScrollViewProps {
  backgroundColor: string;
  height: number;
  top?: number;
  bottom?: number;
}

const OverScrollView: React.FC<OverScrollViewProps> = ({
  backgroundColor,
  height,
  top,
  bottom,
}) => {
  return (
    <>
      {top !== undefined && (
        <View
          style={{
            backgroundColor,
            height,
            position: 'absolute',
            top,
            left: 0,
            right: 0,
          }}
        />
      )}
      {bottom !== undefined && (
        <View
          style={{
            backgroundColor,
            height,
            position: 'absolute',
            bottom,
            left: 0,
            right: 0,
          }}
        />
      )}
    </>
  );
};

export default OverScrollView;
