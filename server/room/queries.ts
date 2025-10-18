import { createQueryKeys } from '@lukemorales/query-key-factory';

import {
  getRoomDetail,
  checkIsRequestedRoom,
  checkIsInvitedRoom,
  searchRoom,
  getSentRequestRoomList,
  checkIsRequestedMember,
  getReceivedRequestList,
  getRoomByInviteCode,
  checkIsInvitedMember,
  checkHasRoom,
  checkRoomName,
} from './room';

export const roomQueries = createQueryKeys('room', {
  detail: ({ roomId }: { roomId: number }) => ({
    queryKey: ['detail', roomId],
    queryFn: () => getRoomDetail(roomId),
  }),
  myRoomDetail: ({ roomId }: { roomId: number }) => ({
    queryKey: ['my-room', roomId],
    queryFn: () => getRoomDetail(roomId),
  }),
  // pending-status
  checkIsRequestedRoom: ({ roomId }: { roomId: number }) => ({
    queryKey: ['requested-room', roomId],
    queryFn: () => checkIsRequestedRoom(roomId),
  }),
  // invited-status
  checkIsInvitedRoom: ({ roomId }: { roomId: number }) => ({
    queryKey: ['invited-room', roomId],
    queryFn: () => checkIsInvitedRoom(roomId),
  }),
  searchRoom: ({ keyword }: { keyword: string }) => ({
    queryKey: ['search', keyword],
    queryFn: () => searchRoom(keyword),
  }),
  sentRequestRoomList: ({ size }: { size?: number }) => ({
    queryKey: ['sent-request', size],
    queryFn: (page: number) => getSentRequestRoomList(page, size),
  }),
  // pending-status
  checkIsRequestedMember: ({ memberId }: { memberId: number }) => ({
    queryKey: ['requested-member', memberId],
    queryFn: () => checkIsRequestedMember(memberId),
  }),
  // pending-members
  receivedRequestList: () => ({
    queryKey: ['received-requests'],
    queryFn: () => getReceivedRequestList(),
  }),
  roomByInviteCode: ({ inviteCode }: { inviteCode: string }) => ({
    queryKey: ['by-invite', inviteCode],
    queryFn: () => getRoomByInviteCode(inviteCode),
  }),
  //pending-status
  checkIsInvitedMember: ({ memberId }: { memberId: number }) => ({
    queryKey: ['invited-member', memberId],
    queryFn: () => checkIsInvitedMember(memberId),
  }),
  checkHasRoom: () => ({
    queryKey: ['has-room'],
    queryFn: () => checkHasRoom(),
  }),
  checkDuplicateRoomName: ({ roomName }: { roomName: string }) => ({
    queryKey: ['check-name', roomName],
    queryFn: () => checkRoomName(roomName),
  }),
});
