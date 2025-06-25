import { MemberData } from './member';

export type MemberStatItem = {
  dormName: string;
  numOfRoommate: string;
  admissionYear: string | undefined;
  dormJoiningStatus: string;
  wakeUpTime: number | undefined;
  sleepingTime: number | undefined;
  turnOffTime: number | undefined;
  smokingStatus: string;
  sleepingHabits: string[] | undefined;
  coolingIntensity: string;
  heatingIntensity: string;
  lifePattern: string;
  intimacy: string;
  sharingStatus: string;
  gamingStatus: string;
  callingStatus: string;
  studyingStatus: string;
  eatingStatus: string;
  cleannessSensitivity: string;
  noiseSensitivity: string;
  cleaningFrequency: string;
  drinkingFrequency: string;
  personalities: string[] | undefined;
  mbti: string;
  selfIntroduction: string;
};

export interface MemberDetailItem {
  memberDetail: MemberData;
  memberStatDetail: MemberStatItem;
  equality: number | null;
  roomId: number;
  isRoomPublic: boolean;
  hasRequestedRoomEntry: boolean;
  favoriteId: number;
}

export interface UserDetailComponentProps {
  data: MemberDetailItem;
}
