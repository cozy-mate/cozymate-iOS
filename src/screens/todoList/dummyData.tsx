export const dummyData = {
  timePoint: '2024-08-15',
  myTodoList: [
    {
      id: 1,
      content: '더기랑 요월먹기',
      completed: true,
    },
    {
      id: 2,
      content: '설거지하기',
      completed: true,
    },
  ],
  mateTodoList: {
    제이: [],
    더기: [
      {
        id: 1,
        content: '한화 경기 재방송 보기',
        completed: true,
      },
      {
        id: 2,
        content: '건조기 돌리기',
        completed: false,
      },
      {
        id: 3,
        content: '델로랑 요월먹기',
        completed: false,
      },
    ],
    너진: [
      {
        id: 1,
        content: '설거지하기',
        completed: false,
      },
      {
        id: 2,
        content: '콩이랑 영상통화 하기',
        completed: true,
      },
    ],
  },
};

export const ruleDummyData = [
  {
    id: 1,
    content: '새벽 1시 이전에 귀가하기',
    memo: '',
  },
  {
    id: 2,
    content: '자신이 맡은 역할 제대로 수행 못할 시, 5000원',
    memo: '',
  },
  {
    id: 3,
    content: '매주 금요일은 Party! 다같이 저녁 먹기!',
    memo: '참여 안하면 5000원!! 12시 이전 무조건 귀가!',
  },
];

export const roleDummyData = {
  myRoleList: [
    {
      id: 1,
      content: '환한 미소로 룸메들을 반겨주기',
      repeatDayList: [],
      allDays: true,
    },
    {
      id: 2,
      content: '음식물 쓰레기 버리기',
      repeatDayList: ['화', '수'],
      allDays: false,
    },
    {
      id: 3,
      content: '쓰레기 통 비우기',
      repeatDayList: ['금'],
      allDays: false,
    },
    {
      id: 4,
      content: '빨래, 건조기 돌리기',
      repeatDayList: ['토'],
      allDays: false,
    },
  ],
  otherRoleList: {
    제이: [],
    더기: [
      {
        id: 1,
        content: '건조기 돌리기',
        repeatDayList: ['화', '토'],
        allDays: false,
      },
      {
        id: 2,
        content: '화장실 청소하기',
        repeatDayList: ['일'],
        allDays: false,
      },
    ],
    너진: [
      {
        id: 1,
        content: '음식물 쓰레기 버리기',
        repeatDayList: ['금'],
        allDays: false,
      },
      {
        id: 2,
        content: '설거지하기',
        repeatDayList: ['토'],
        allDays: false,
      },
    ],
  },
};
