// import { getPostList } from '@server/api/post';
// import { useInfiniteQuery } from '@tanstack/react-query';

// export const useGetPostList = (roomId: number) => {

//   const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
//     queryKey: ['postList', roomId],
//     initialPageParam: 0,
//     queryFn: ({ pageParam }) => {
//       const result = getPostList(roomId, pageParam);
//       //console.log(result)
//       return result;
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       // 함부로 건드리면 무한 스크롤... 주의!!
//       return lastPage.result.length === 10 ? allPages.length : undefined;
//     },
//     select: (data) => {
//       const transformedPages = data.pages.map((page) =>
//         page.result.map((post) => ({
//           id: post.id,
//           content: post.content,
//           writer: {
//             id: post.writerId,
//             nickname: post.nickname,
//             persona: post.persona,
//           },
//           imageList: post.imageList,
//           commentCount: post.commentCount,
//           createdAt: post.createdAt,
//         })),
//       );
//       return {
//         pages: transformedPages,
//         pageParams: data.pageParams,
//       };
//     },
//   });

//   return { data, isLoading, isError, refetch, fetchNextPage, hasNextPage };
// };

// export const useGetDetailPostForEdit = (roomId: number, postId: number) => {
//   const { data, isLoading, isError, isSuccess, error } = useQuery({
//     queryKey: ['postDetail', roomId, postId],
//     queryFn: () => {
//       return getDetailPost(roomId, postId);
//     },
//     select: (data) => {
//       return {
//         images: data.result.imageList.map((url: string) => ({ uri: url } as Asset)),
//         postDescription: data.result.content,
//       };
//     },
//   });
//   return {
//     data,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   };
// };

// export const useCreatePost = () => {
//   const { isError, isSuccess, isPending, mutate } = useMutation({
//     mutationFn: (data: CreatePostRequest) => {
//       return createPost(data);
//     },
//   });
//   return {
//     isError,
//     isSuccess,
//     isPending,
//     mutate,
//   };
// };

// export const useUploadImagesToS3 = () => {
//   const { isError, isSuccess, isPending, mutateAsync, data } = useMutation({
//     mutationFn: (files: Asset[]) => {
//       return uploadAssetImageToS3(files);
//     },
//   });
//   return {
//     isError,
//     isSuccess,
//     isPending,
//     mutateAsync,
//     data
//   };
// };

// export const useUpdatePost = () => {
//   const { isError, isSuccess, isPending, mutate } = useMutation({
//     mutationFn: (data: UpdatePostRequest) => {
//       return updatePost(data);
//     },
//   });
//   return {
//     isError,
//     isSuccess,
//     isPending,
//     mutate,
//   };
// };
