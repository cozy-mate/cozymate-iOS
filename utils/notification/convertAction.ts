import * as Notifications from 'expo-notifications';
import { ActionType } from '@/type/actionType';
import { actionTypeToPath } from '@/constants/notification';

const NO_ACTION = 'NO_ACTION';

export const convertAction = (response: Notifications.NotificationResponse) => {
  const actionType = response.notification.request.content.data?.actionType as ActionType | undefined;

  if (!actionType) {
    return actionTypeToPath["SELECT_COZY_MATE"];
  }

  const basePath = actionTypeToPath[actionType];

  if (!basePath) {
    return NO_ACTION;
  }

  if (actionType === 'ARRIVE_ROOM_INVITE') {
    const roomId = response.notification.request.content.data?.roomId;
    return roomId ? basePath + roomId : NO_ACTION;
  }

  if (actionType === 'ARRIVE_ROOM_JOIN_REQUEST') {
    const memberId = response.notification.request.content.data?.memberId;
    return memberId ? basePath + memberId : NO_ACTION;
  }

  return basePath;
};