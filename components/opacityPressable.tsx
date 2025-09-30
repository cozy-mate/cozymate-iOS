import { ReactNode, useState } from 'react';
import { Pressable, PressableProps } from 'react-native';

interface OpacityPressableProps extends PressableProps {
  children: ReactNode;
}

export default function OpacityPressable({ children, onPress, ...rest }: OpacityPressableProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      className={`${isPressed && 'opacity-60'}`}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
