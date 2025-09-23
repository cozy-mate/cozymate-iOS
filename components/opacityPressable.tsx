import { ReactNode, useState } from 'react';
import { Pressable, PressableProps } from 'react-native';

interface OpacityPressableProps extends PressableProps {
  children: ReactNode;
  className?: string;
}

export default function OpacityPressable({
  children,
  className,
  onPress,
  ...rest
}: OpacityPressableProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      className={`${className ?? ''} ${isPressed && 'opacity-60'}`}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
