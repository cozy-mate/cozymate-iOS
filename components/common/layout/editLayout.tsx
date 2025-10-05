import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '../backHeader';

export const EditLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <SafeAreaView className={`flex-1 bg-white ${className}`}>
            <View className="px-5">
                <BackHeaderComponent />
            </View>
            {children}
        </SafeAreaView>
    );
};