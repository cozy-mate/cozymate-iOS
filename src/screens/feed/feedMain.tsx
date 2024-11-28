// import { useQueryClient } from '@tanstack/react-query';
// import { useFocusEffect } from '@react-navigation/native';
// import React, { useRef, Fragment, useEffect, useCallback } from 'react';
// import { Text, View, FlatList, Pressable, RefreshControl } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// import Header from '@components/feedMain/header';
// import Footer from '@components/feedMain/footer';
// import PostCard from '@components/feedMain/postCard';

// import { useHasRoomStore } from '@zustand/room/room';

// import { useGetFeedInfo } from '@hooks/api/feed';
// import { useGetPostList } from '@hooks/api/post';

// import { FeedMainScreenProps } from '@type/param/stack';

// import PostEdit from '@assets/feedMain/postEdit.svg';

// const FeedMainScreen = ({ navigation }: FeedMainScreenProps) => {
//   const { bottom } = useSafeAreaInsets();
//   const queryClient = useQueryClient();

//   const { myRoom } = useHasRoomStore();

//   const flatListRef = useRef<FlatList>(null);

//   const {
//     data: feedInfo,
//     isLoading: isFeedLoading,
//     refetch: refetchFeed,
//   } = useGetFeedInfo(myRoom.roomId);

//   const {
//     data: postList,
//     isLoading: isPostsLoading,
//     fetchNextPage,
//     hasNextPage,
//     refetch: refetchPosts,
//   } = useGetPostList(myRoom.roomId);

//   const handleRefresh = async () => {
//     refetchFeed();
//     refetchPosts();
//     flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
//   };

//   const onEndReached = () => {
//     if (hasNextPage && !isPostsLoading) {
//       fetchNextPage();
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       refetchFeed();
//       refetchPosts();
//     }, [refetchFeed, refetchPosts])
//   );


//   const toFeedCreate = () => {
//     navigation.navigate('FeedCreateScreen', { mode: 'create' });
//   };

//   const toFeedView = (postId: number) => {
//     navigation.navigate('FeedViewScreen', { postId: postId });
//   };

//   return (
//     <Fragment>
//       <SafeAreaView />
//       <FlatList
//         ref={flatListRef}
//         data={postList?.pages.flat()}
//         renderItem={({ item }) => <PostCard post={item} toFeedView={toFeedView} />}
//         ListHeaderComponent={<Header feedInfo={feedInfo} navigation={navigation} />}
//         ListEmptyComponent={
//           isPostsLoading ? (
//             <View className="mt-10 flex-1 items-center justify-center">
//               <Text className="text-sm text-disabledFont">이야기를 불러오는 중입니다...</Text>
//             </View>
//           ) : postList?.pages[0]?.length === 0 ? (
//             <View className="flex-1 items-center justify-center">
//               <Text className="text-sm text-disabledFont">아직 시작된 우리의 이야기가 없어요!</Text>
//             </View>
//           ) : (
//             <View></View>
//           )
//         }
//         ListFooterComponent={<Footer isPostsLoading={isPostsLoading} />}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{
//           flexGrow: 1,
//           alignItems: 'center',
//           width: '100%',
//           paddingHorizontal: 20,
//           paddingBottom: bottom + 20,
//         }}
//         refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
//         showsVerticalScrollIndicator={false}
//         onEndReached={onEndReached}
//         onEndReachedThreshold={0}
//       />

//       <View className="fixed bottom-28 right-5 z-20 flex w-fit items-end">
//         <Pressable onPress={toFeedCreate}>
//           <PostEdit />
//         </Pressable>
//       </View>
//     </Fragment>
//   );
// };

// export default FeedMainScreen;
