import { create } from 'zustand';
import { CreateRoomInfo, MyRoom, Profile, SignUp } from './type';

// 최초 회원가입 시 사용자 정보
export const useSignUpStore = create<{
  signUp: SignUp;
  setSignUp: (newSignUp: Partial<SignUp>) => void;
}>((set) => ({
  signUp: {
    name: '',
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
  setSignUp: (newSignUp) =>
    set((state) => ({
      signUp: { ...state.signUp, ...newSignUp },
    })),
}));

// 사용자 정보
export const useProfileStore = create<{
  profile: Profile;
  setProfile: (newProfile: Partial<Profile>) => void;
}>((set) => ({
  profile: {
    name: '',
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
  setProfile: (newProfile) => set((state) => ({ profile: { ...state.profile, ...newProfile } })),
}));

// 사용자의 방 존재 여부 및 방 아이디
export const useHasRoomStore = create<{
  myRoom: MyRoom;
  setMyRoom: (newMyRoom: Partial<MyRoom>) => void;
}>((set) => ({
  myRoom: {
    hasRoom: false,
    roomId: 0,
  },
  setMyRoom: (newMyRoom) => set((state) => ({ myRoom: { ...state.myRoom, ...newMyRoom } })),
}));

// 방 생성
export const useCreateRoomStore = create<{
  createRoomInfo: CreateRoomInfo;
  setCreateRoomInfo: (newCreateRoomInfo: Partial<CreateRoomInfo>) => void;
}>((set) => ({
  createRoomInfo: {
    name: '',
    profileImage: 0,
    maxMateNum: 0,
  },
  setCreateRoomInfo: (newCreateRoomInfo) =>
    set((state) => ({ createRoomInfo: { ...state.createRoomInfo, ...newCreateRoomInfo } })),
}));
