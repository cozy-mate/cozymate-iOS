import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '../backHeader';

export const DetailLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className={`flex-1 ${className}`}>
                <View className="px-5">
                    <BackHeaderComponent />
                </View>
                {children}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};