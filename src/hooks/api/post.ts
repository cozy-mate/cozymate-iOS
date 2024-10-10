import { getPostList } from '@server/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetPostList = (roomId: number) => {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['postList', roomId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      return getPostList(roomId, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      // 함부로 건드리면 무한 스크롤... 주의!!
      return lastPage.result.length === 10 ? allPages.length : undefined;
    },
    select: (data) => {
      const transformedPages = data.pages.map((page) =>
        page.result.map((post) => ({
          id: post.id,
          content: post.content,
          writer: {
            id: post.writerId,
            nickname: post.nickname,
            persona: post.persona,
          },
          imageList: post.imageList,
          commentCount: post.commentCount,
          createdAt: post.createdAt,
        })),
      );
      return {
        pages: transformedPages,
        pageParams: data.pageParams,
      };
    },
  });

  return { data, isLoading, isError, refetch, fetchNextPage, hasNextPage };
};
