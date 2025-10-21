import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { matchQuery, Query, QueryKey } from '@tanstack/react-query';

import { commentQueries } from './comment/queries';
import { dormitoryQueries } from './dormitory/queries';
import { feedQueries } from './feed/queries';
import { inquiryQueries } from './inquiry/queries';
import { memberQueries } from './member/queries';
import { memberBlockQueries } from './member-block/queries';
import { memberFavoriteQueries } from './member-favorite/queries';
import { memberStatQueries } from './member-stat/queries';
import { memberStatPreferenceQueries } from './member-stat-preference/queries';
import { messageQueries } from './message/queries';
import { messageRoomQueries } from './message-room/queries';
import { notificationQueries } from './notification/queries';
import { postQueries } from './post/queries';
import { roleQueries } from './role/queries';
import { roomQueries } from './room/queries';
import { roomFavoriteQueries } from './room-favorite/queries';
import { roomLogQueries } from './room-log/queries';
import { roomMemberStatQueries } from './room-member-stat/queries';
import { roomRecommendQueries } from './room-recommend/queries';
import { ruleQueries } from './rule/queries';
import { s3Queries } from './s3/queries';
import { todoQueries } from './todo/queries';
import { universityQueries } from './university/queries';

export const queries = mergeQueryKeys(
  messageQueries,
  messageRoomQueries,
  inquiryQueries,
  memberQueries,
  memberBlockQueries,
  memberFavoriteQueries,
  memberStatQueries,
  memberStatPreferenceQueries,
  notificationQueries,
  roleQueries,
  roomQueries,
  roomFavoriteQueries,
  roomLogQueries,
  roomMemberStatQueries,
  roomRecommendQueries,
  ruleQueries,
  todoQueries,
  universityQueries,
  feedQueries,
  postQueries,
  commentQueries,
  s3Queries,
  dormitoryQueries,
);

export const matchMultiQueries = (queryKeys: readonly QueryKey[]) => {
  return (query: Query) =>
    queryKeys.some((queryKey) => {
      return matchQuery({ queryKey }, query);
    });
};
