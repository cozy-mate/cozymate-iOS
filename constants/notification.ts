import { ActionType } from '@/type/actionType';

const prefix = 'cozymate://';

export const actionTypeToPath: Record<ActionType, string> = {
  SELECT_COZY_MATE: prefix.concat('(tabs)/roleNRule'),
  COMPLETE_ALL_TODAY_TODO: prefix.concat('(tabs)/roleNRule'),
  REMINDER_ROLE: prefix.concat('(tabs)/roleNRule'),
  TODO_LIST: prefix.concat('(tabs)/roleNRule'),
  ROOM_IN: prefix.concat('(tabs)/cozyHome'),
  ROOM_OUT: prefix.concat('(tabs)/cozyHome'),
  ACCEPT_ROOM_INVITE: prefix.concat('room/'),
  ARRIVE_ROOM_INVITE: prefix.concat('user/'),
  ACCEPT_ROOM_JOIN: prefix.concat('room/'),
  ARRIVE_ROOM_JOIN_REQUEST: prefix.concat('user/'),
} as const;
