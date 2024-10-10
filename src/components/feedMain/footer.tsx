import React from 'react'
import { View, Text } from 'react-native';

type Props = {
    isPostsLoading: boolean
}

const Footer = (props: Props) => {
    const { isPostsLoading } = props;
    
    if (!isPostsLoading) return null;

    return (
      <View className="py-4">
        <Text className="text-sm text-disabledFont">로딩 중...</Text>
      </View>
    );
}

export default Footer