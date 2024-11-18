import React from 'react';
import { FlatList } from 'react-native';

import UserComponent from './userComponent';

interface UsersComponentProps {
  users: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      majorName: string;
      persona: number;
    };
    equality: number;
    preferenceStats: Record<string, string | number>;
  }[];
  loadMoreUsers: () => void;
  toUserDetail: (id: number) => void;
}

const UsersComponent: React.FC<UsersComponentProps> = ({ users, loadMoreUsers, toUserDetail }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.memberDetail.memberId.toString()}
      renderItem={({ item }) => <UserComponent user={item} toUserDetail={toUserDetail} />}
      onEndReached={loadMoreUsers}
      onEndReachedThreshold={0.75}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    />
  );
};

export default UsersComponent;
