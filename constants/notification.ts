import { ActionType } from '@/type/actionType';

const prefix = 'cozymate://';

export const actionTypeToPath: Record<ActionType, string> = {
  SELECT_COZY_MATE: prefix.concat('(tabs)/roleNRule'),
  COMPLETE_ALL_TODAY_TODO: prefix.concat('(tabs)/roleNRule'),
  REMINDER_ROLE: prefix.concat('(tabs)/roleNRule'),
  TODO_LIST: prefix.concat('(tabs)/roleNRule'),
  ROOM_IN: prefix.concat('(tabs)/home'),
  ROOM_OUT: prefix.concat('(tabs)/home'),
  ACCEPT_ROOM_INVITE: prefix.concat('(tabs)/home'),
  ARRIVE_ROOM_INVITE: prefix.concat('(tabs)/home'),
  ACCEPT_ROOM_JOIN: prefix.concat('(tabs)/home'),
  ARRIVE_ROOM_JOIN_REQUEST: prefix.concat('(tabs)/home'),
} as const;
