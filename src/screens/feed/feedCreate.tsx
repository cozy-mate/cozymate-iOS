import React, { useCallback, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

import PostImage from '@assets/feedCreate/postImage.svg';
import ImageDeleteIcon from '@assets/feedCreate/imageDeleteIcon.svg';

import { FeedCreateScreenProps } from '@type/param/loginStack';

const FeedCreateScreen = (props: FeedCreateScreenProps) => {
  const MAX_IMAGE_COUNT = 10;
  const [postDescription, setPostDescription] = React.useState<string>('');
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Asset[]>([]);

  useEffect(() => {
    setIsComplete(postDescription !== '');
  }, [postDescription]);

  const valueHandleDescriptionChange = (text: string) => {
    setPostDescription(text);
  };

  const pickImages = async () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0 }, // selectionLimit: 0 -> unlimited selection
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (images.length + response.assets!.length > MAX_IMAGE_COUNT) {
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImages((prevImages) => [...prevImages, ...response.assets!]);
        }
      },
    );
  };

  const deleteImage = (index: any) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const renderItem = useCallback(({ item, getIndex, drag }: RenderItemParams<Asset>) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 1.1, // Slightly enlarge
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1, // Return to original size
        useNativeDriver: true,
      }).start();
    };

    const handleDelete = () => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0,
          duration: 200,

          useNativeDriver: true,
        }),
        //별도 효과 추가 가능
      ]).start(() => deleteImage(getIndex()));
    };

    return (
      <View className="relative mr-2">
        <TouchableOpacity onLongPress={drag} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.Image
            source={{ uri: item.uri }}
            className="w-20 h-20 rounded-xl"
            style={{ transform: [{ scale }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute -top-1 right-0"
          onPress={() => {
            handleDelete();
          }}
        >
          <ImageDeleteIcon />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 flex-col bg-white pl-8 pr-8 pt-8 w-full h-full">
      <View className="flex flex-row w-full h-24 mb-4 items-center justify-center">
        <TouchableOpacity
          className="flex items-center justify-center h-20 w-20 rounded-xl bg-colorBox mr-2 mt-2"
          onPress={pickImages}
        >
          <PostImage className="mb-2" />
          <Text className="text-sm text-disabledFont">{`${images.length}/${MAX_IMAGE_COUNT}`}</Text>
        </TouchableOpacity>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <DraggableFlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => `draggable-${item.uri}`}
            horizontal={true}
            onDragEnd={({ data }) => setImages(data)}
            className="flex h-full"
            contentContainerStyle={{
              alignItems: 'center',
              margin: 8,
            }}
          />
        </ScrollView>
      </View>
      <View className="flex-1 flex-col items-center justify-start mb-4">
        <TextInput
          placeholder="내용를 입력해주세요"
          value={postDescription}
          onChangeText={valueHandleDescriptionChange}
          multiline={true}
          className="w-full p-4 pr-8 h-2/3 bg-colorBox text-basicFont rounded-xl"
          textAlignVertical="top"
          numberOfLines={20}
        />
      </View>
      <View className="flex">
        <Pressable className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'} p-4 rounded-xl`}>
          <Text className="text-base font-semibold text-center text-white">확인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FeedCreateScreen;
