const linking = {
  prefixes: ['cozymate://'],
  config: {
    screens: {
      '(onBoard)': {
        screens: {
          index: 'onBoard/index',
          schoolAuthentication: 'onBoard/schoolAuthentication',
          personalInfo: 'onBoard/personalInfo',
          character: 'onBoard/character',
          chipSelect: 'onBoard/chipSelect',
          complete: 'onBoard/complete',
        },
      },
      '(tabs)': {
        screens: {
          home: 'tabs/home',
          roleNRule: 'tabs/roleNRule',
          cozyBot: 'tabs/cozyBot',
          feed: 'tabs/feed',
          myPage: 'tabs/myPage',
        },
      },
      lifeStyle: {
        screens: {
          onboarding: 'lifeStyle/onboarding',
          basicInfo: 'lifeStyle/basicInfo',
          essentialInfo: 'lifeStyle/essentialInfo',
          additionalInfo: 'lifeStyle/additionalInfo',
        },
      },
      notification: 'notification',
      chat: {
        screens: {
          list: 'chat/list',
          '[id]': 'chat/:id',
          'send/[id]': 'chat/send/:id',
        },
      },
      room: {
        screens: {
          '[id]': 'room/:id',
          createRoom: 'room/createRoom',
          joinRoom: 'room/joinRoom',
          sentRequest: 'room/sentRequest',
          recommendRoom: 'room/recommendRoom',
        },
      },
      roleNRule: {
        screens: {
          create: 'roleNRule/create',
          'update/[type]': 'roleNRule/update/:type',
        },
      },
      user: {
        screens: {
          '[id]': 'user/:id',
          receivedRequest: 'user/receivedRequest',
          roomMate: 'user/roomMate',
          search: 'user/search',
        },
      },
      myPage: {
        screens: {
          myInfo: 'myPage/myInfo',
          'updateInfo/[type]': 'myPage/updateInfo/:type',
          schoolAuthentication: 'myPage/schoolAuthentication',
          myLifeStyle: 'myPage/myLifeStyle',
          likeRoommate: 'myPage/likeRoommate',
          inquiry: 'myPage/inquiry',
          withdraw: 'myPage/withdraw',
        },
      },
      '+not-found': '*',
    },
  },
};

export default linking;