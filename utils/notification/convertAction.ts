import * as Notifications from 'expo-notifications';

import { actionTypeToPath } from '@/constants/notification';
import { ActionType } from '@/type/actionType';

const NO_ACTION = 'NO_ACTION';

export const convertAction = (response: Notifications.NotificationResponse) => {
  const actionType = response.notification.request.content.data?.actionType as
    | ActionType
    | undefined;

  if (!actionType) {
    return NO_ACTION;
  }

  const basePath = actionTypeToPath[actionType];

  if (!basePath) {
    return NO_ACTION;
  }

  if (actionType === 'ACCEPT_ROOM_INVITE') {
    const roomId = response.notification.request.content.data?.roomId;
    return roomId ? basePath + roomId : NO_ACTION;
  }

  if (actionType === 'ARRIVE_ROOM_INVITE') {
    const memberId = response.notification.request.content.data?.memberId;
    return memberId ? basePath + memberId : NO_ACTION;
  }

  if (actionType === 'ACCEPT_ROOM_JOIN') {
    const roomId = response.notification.request.content.data?.roomId;
    return roomId ? basePath + roomId : NO_ACTION;
  }

  if (actionType === 'ARRIVE_ROOM_JOIN_REQUEST') {
    const memberId = response.notification.request.content.data?.memberId;
    return memberId ? basePath + memberId : NO_ACTION;
  }

  return basePath;
};
