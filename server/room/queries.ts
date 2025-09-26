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
  getRoomDetail: ({ roomId }: { roomId: number }) => ({
    queryKey: ['detail', roomId],
    queryFn: () => getRoomDetail(roomId),
  }),
  checkIsRequestedRoom: ({ roomId }: { roomId: number }) => ({
    queryKey: ['requested-room', roomId],
    queryFn: () => checkIsRequestedRoom(roomId),
  }),
  checkIsInvitedRoom: ({ roomId }: { roomId: number }) => ({
    queryKey: ['invited-room', roomId],
    queryFn: () => checkIsInvitedRoom(roomId),
  }),
  searchRoom: ({ keyword }: { keyword: string }) => ({
    queryKey: ['search', keyword],
    queryFn: () => searchRoom(keyword),
  }),
  getSentRequestRoomList: ({ page, size }: { page?: number; size?: number } = {}) => ({
    queryKey: ['sent-request', page, size],
    queryFn: () => getSentRequestRoomList(page, size),
  }),
  checkIsRequestedMember: ({ memberId }: { memberId: number }) => ({
    queryKey: ['requested-member', memberId],
    queryFn: () => checkIsRequestedMember(memberId),
  }),
  getReceivedRequestList: () => ({
    queryKey: ['received-requests'],
    queryFn: () => getReceivedRequestList(),
  }),
  getRoomByInviteCode: ({ inviteCode }: { inviteCode: string }) => ({
    queryKey: ['by-invite', inviteCode],
    queryFn: () => getRoomByInviteCode(inviteCode),
  }),
  checkIsInvitedMember: ({ memberId }: { memberId: number }) => ({
    queryKey: ['invited-member', memberId],
    queryFn: () => checkIsInvitedMember(memberId),
  }),
  checkHasRoom: () => ({
    queryKey: ['has-room'],
    queryFn: () => checkHasRoom(),
  }),
  checkRoomName: ({ roomName }: { roomName: string }) => ({
    queryKey: ['check-name', roomName],
    queryFn: () => checkRoomName(roomName),
  }),
});
