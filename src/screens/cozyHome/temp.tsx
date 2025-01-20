const data: { title: string; visible?: boolean; data: any }[] = [
  {
    title: '참여 요청한 방 목록',
    visible:
      !myRoom.hasRoom && requestRoomList !== undefined && requestRoomList?.result.length !== 0,
    data: requestRoomList?.result,
  },
  { title: '내 방 정보', visible: myRoom.hasRoom, data: roomData?.result },
  {
    title: '참여 요청 받은 룸메이트 목록',
    visible:
      myRoom.hasRoom &&
      requestMemberList !== undefined &&
      requestMemberList.result.length !== 0 &&
      roomData !== null &&
      roomData.result.isRoomManager,
    data: requestMemberList?.result,
  },
  { title: '추천 룸메이트 목록', data: userList.result.memberList },
  { title: '추천 방 목록', data: roomList.result.result },
];

const renderItems = ({ item }) => {
  switch (item.title) {
    case '참여 요청한 방 목록':
      return <RequestRoomsComponent navigation={navigation} roomList={item.data} />;
    case '내 방 정보':
      return <MyRoomComponent navigation={navigation} roomData={item.data} />;
    case '참여 요청 받은 룸메이트 목록':
      return <RequestUsersComponent navigation={navigation} userList={item.data} />;
    case '추천 룸메이트 목록':
      return <RecommendUserList navigation={navigation} users={item.data} />;
    case '추천 방 목록':
      return <RecommendRoomList navigation={navigation} rooms={item.data} />;
    default:
      return null;
  }
};

const [filterData] = useState(data.filter((item) => item.visible || item.visible === undefined));

{
  /* <FlatList
        onScroll={handleScroll}
        className="bg-white"
        data={filterData}
        renderItem={renderItems}
        ListHeaderComponent={
          <HeaderComponent navigation={navigation} handleLayout={handleLayout} />
        }
        ListFooterComponent={<View className="h-24" />}
        ItemSeparatorComponent={() => <View className="my-6 h-2.5 bg-[#F7F9FA]" />}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        bounces={false}
      /> */
}
