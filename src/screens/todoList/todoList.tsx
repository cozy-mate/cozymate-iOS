import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavBar from '@components/navBar';

import { TodoListScreenProps } from '@type/param/roomStack';

import Background from '@assets/background.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';

import PlusButton from '@assets/plusButton.svg';

import TodoBox from '@components/todoList/todoBox';
import OthersTodoBox from '@components/todoList/othersTodoBox';
import RuleBox from '@components/todoList/ruleBox';
import RoleBox from '@components/todoList/roleBox';

import { getDayOfWeek } from '@utils/getDay';

import MyRoleBox from '@components/todoList/myRoleBox';
import ControlModal from '@components/feedView/controlModal';
import { useFeedModal } from '@hooks/useFeedModal';
import { changeTodoState, getTodoData } from '@server/api/todo';
import { useRecoilState } from 'recoil';
import { profileState, roomInfoState } from '@recoil/recoil';
import { getRuleData } from '@server/api/rule';
import { getRoleData } from '@server/api/role';

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
}

interface MateTodoItem {
  persona: number;
  mateTodoList: TodoItem[];
}

interface MateTodo {
  [key: string]: MateTodoItem;
}

interface RuleItem {
  id: number;
  content: string;
  memo: string;
}

interface RoleItem {
  id: number;
  content: string;
  repeatDayList: string[];
  allDays: boolean;
}

interface MateRoleItem {
  persona: number;
  mateRoleList: RoleItem[];
}

interface MateRole {
  [key: string]: MateRoleItem;
}

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const [myProfile, setMyProfile] = useRecoilState(profileState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  const [isTodo, setIsTodo] = useState<boolean>(true);

  // Todo용 데이터
  const [today, setToday] = useState<string>('');
  const [myTodoData, setMyTodoData] = useState<TodoItem[]>([]);
  const [mateTodoData, setMateTodoData] = useState<MateTodo>({});

  // Role용 데이터
  const [ruleData, setRuleData] = useState<RuleItem[]>([]);

  // Rule용 데이터
  const [myRoleData, setMyRoleData] = useState<MateRoleItem>({
    persona: 0,
    mateRoleList: [],
  });
  const [mateRoleData, setMateRoleData] = useState<MateRole>({});

  const handleNav = () => {
    setIsTodo(!isTodo);
  };

  const toCreate = () => {
    navigation.navigate('CreateTodoScreen', { type: isTodo ? 'todo' : 'role' });
  };

  const getRoomTodoList = async () => {
    const response = await getTodoData(roomInfo.roomId);
    console.log(response);
    console.log(response.result.mateTodoList);

    setToday(getDayOfWeek(response.result.timePoint));
    setMyTodoData(response.result.myTodoList.mateTodoList);
    setMateTodoData(response.result.mateTodoList);
  };

  const getRoomRuleData = async () => {
    const response = await getRuleData(roomInfo.roomId);
    console.log(response);

    setRuleData(response.result);
  };

  const getRoomRoleData = async () => {
    const response = await getRoleData(roomInfo.roomId);
    console.log(response);

    setMyRoleData(response.result.myRoleList);
    setMateRoleData(response.result.otherRoleList);
  };

  useEffect(() => {
    getRoomTodoList();
    getRoomRuleData();
    getRoomRoleData();
  }, []);

  const changeTodo = async (todo: TodoItem) => {
    const response = await changeTodoState({ todoId: todo.id, completed: !todo.completed });
    console.log(response);
  };

  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();

  return (
    <View className="flex-1 bg-[#CADFFF]" onTouchEnd={onPressModalClose}>
      <Background style={{ position: 'absolute' }} />
      <View className="mt-[76px] mx-5">
        <NavBar isTodo={isTodo} handleNav={handleNav} />
      </View>
      <ScrollView className="bg-[#F7FAFF] px-5 pt-[34px] rounded-tr-[48px]">
        <View>
          {isTodo ? (
            <>
              {/* 나의 투두리스트 목록 */}
              <View className="mb-14">
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    {today}, <Text className="text-main1">{myProfile.nickname}</Text>
                    님이{'\n'}해야할 일들을 알려드릴게요!
                  </Text>
                  <Pressable onPress={onPressModalOpen} ref={dotIconRef}>
                    <SettingIcon />
                  </Pressable>

                  <ControlModal
                    isModalVisible={isModalVisible}
                    modalPosition={modalPosition}
                    onSubmit={onPressModalClose}
                    onEdit={toCreate}
                    onPressModalClose={onPressModalClose}
                  />
                </View>
                <TodoBox todoData={myTodoData} changeTodo={changeTodo} />
              </View>

              {/* 다른 메이트들의 투두리스트 목록 */}
              <View style={{ paddingBottom: bottom }}>
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    다른 메이트들은{'\n'}오늘 어떤 일들을 할까요?
                  </Text>
                </View>
                {Object.entries(mateTodoData).map(([name, mate]) => (
                  <OthersTodoBox
                    key={name}
                    persona={mate.persona}
                    mateTodoData={[{ name, todos: mate.mateTodoList }]}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              {/* 코지홈의 Rule */}
              <View className="mb-14">
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}규칙에 대해
                    알려드릴게요!
                  </Text>
                  <SettingIcon />
                </View>
                <RuleBox ruleData={ruleData} />
              </View>

              {/* 코지홈의 Role */}
              <View style={{ paddingBottom: bottom }}>
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}역할에 대해
                    알려드릴게요!
                  </Text>
                  <SettingIcon />
                </View>

                <MyRoleBox
                  persona={myRoleData.persona}
                  roleData={myRoleData.mateRoleList}
                  nickname={myProfile.nickname}
                />

                {Object.entries(mateRoleData).map(([name, mate], index) => (
                  <RoleBox
                    key={index}
                    persona={mate.persona}
                    roleData={[
                      {
                        name: name,
                        roles: mate.mateRoleList,
                      },
                    ]}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className="absolute z-20 bottom-8 right-5 w-fit">
        <Pressable onPress={toCreate} className="w-fit">
          <PlusButton />
        </Pressable>
      </View>
    </View>
  );
};

export default TodoListScreen;
