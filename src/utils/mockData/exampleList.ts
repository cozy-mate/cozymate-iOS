import { CommentType, PostCardType } from '@type/feed/postType';
export const examplePostList: PostCardType[] = [
  {
    id: 1,
    content: '이것은 테스트 게시물입니다.',
    writer: {
      id: 3,
      nickname: '테스터3',
      persona: 3,
    },
    imageList: [],
    commentCount: 4,
    createdAt: '2024-08-08T10:00:00',
    updatedAt: '2021-09-09T00:00:00',
  },
  {
    id: 2,
    content: '이것은 테스트 게시물입니다.',
    writer: {
      id: 1,
      nickname: '테스터',
      persona: 1,
    },
    imageList: [
      'https://picsum.photos/300/300',
      'https://picsum.photos/400/300',
      'https://picsum.photos/100/300',
    ],
    commentCount: 0,
    createdAt: '2024-08-07T10:00:00',
    updatedAt: '2021-09-09T00:00:00',
  },
  {
    id: 3,
    content: '이것은 두번째 테스트 게시물입니다.',
    writer: {
      id: 2,
      nickname: '테스터2',
      persona: 2,
    },
    imageList: ['https://picsum.photos/200/300'],
    commentCount: 0,
    createdAt: '2024-08-06T10:00:00',
    updatedAt: '2021-09-09T00:00:00',
  },
];

export const exampleCommentList: CommentType[] = [
  {
    id: 1,
    content: '이것은 테스트 댓글입니다.',
    writer: {
      id: 3,
      nickname: '테스터3',
      persona: 3,
    },
    createdAt: '2024-08-08T10:00:00',
    updatedAt: '2021-09-09T00:00:00',
  },
  {
    id: 2,
    content: '이것은 두번째 테스트 댓글입니다.',
    writer: {
      id: 1,
      nickname: '테스터',
      persona: 1,
    },
    createdAt: '2024-08-07T10:00:00',
    updatedAt: '2021-09-09T00:00:00',
  },
  {
    id: 3,
    content: '이것은 세번째 테스트 댓글입니다.',
    writer: {
      id: 2,
      nickname: '테스터2',
      persona: 2,
    },
    createdAt: '2024-08-06T10:00:00',
    updatedAt: '2021-09-09T00:00:00',
  },
];
