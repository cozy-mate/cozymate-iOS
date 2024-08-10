import Clipboard from '@react-native-clipboard/clipboard';
import { Alert } from 'react-native';

export const onCopyAddress = (text: string) => {
  try {
    Clipboard.setString(text);
    Alert.alert('초대코드가 클립보드에 복사되었습니다.');
  } catch (error) {
    console.log(error);
  }
};
