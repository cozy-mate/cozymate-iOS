import { ReactNode } from 'react';
import { View } from 'react-native';

interface BorderContainerProps {
  isError?: boolean;
  isFocused?: boolean;
  children: ReactNode;
}

const BorderContainer: React.FC<BorderContainerProps> = ({ isError, isFocused, children }) => {
  const borderColor = isError
    ? 'border-warningColor'
    : isFocused
      ? 'border-subColor1'
      : 'border-disabledColor';

  return (
    <View
      className={`border ${borderColor} rounded-xl p-[20px] h-[80px] flex-row items-center justify-between`}
    >
      {children}
    </View>
  );
};

export default BorderContainer;
