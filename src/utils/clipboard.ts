import Clipboard from '@react-native-clipboard/clipboard';

export const onCopyAddress = async (text: string) => {
  try {
    await Clipboard.setString(text);
  } catch (error) {
    console.log(error);
  }
};
