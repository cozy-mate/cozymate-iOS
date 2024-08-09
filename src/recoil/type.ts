export type SignUp = {
  name: string;
  nickname: string;
  gender: string;
  birth: string;
  character: number;
};

export type RoomInfo = {
  name: string;
  profileImage: number;
  maxMateNum: number;
  creatorId: number;
};

export type LifeStyle = {
  universityId: number;
  admissionYear: string;
  major: string;
  numOfRoommate: number;
  acceptance: string;
  wakeUpMeridian: string;
  wakeUpTime: number;
  sleepingMeridian: string;
  sleepingTime: number;
  turnOffMeridian: string;
  turnOffTime: number;
  smokingState: string;
  sleepingHabit: string;
  airConditioningIntensity: number;
  heatingIntensity: number;
  lifePattern: string;
  intimacy: string;
  canShare: boolean;
  isPlayGame: boolean;
  isPhoneCall: boolean;
  studying: string;
  intake: string;
  cleanSensitivity: number;
  noiseSensitivity: number;
  cleaningFrequency: string;
  personality: string;
  mbti: string;
  options: {
    additionalProp1: string[];
    additionalProp2: string[];
    additionalProp3: string[];
  };
};
