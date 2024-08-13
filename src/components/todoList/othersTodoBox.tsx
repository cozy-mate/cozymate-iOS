import React from 'react';
import { View } from 'react-native';

interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
}

interface OthersTodoBoxProps {
  othersData: TodoItem[];
}

const OthersTodoBox: React.FC<OthersTodoBoxProps> = ({}) => {
  return <View></View>;
};

export default OthersTodoBox;
