import { ButtonEvent, InputEvent, ScreenName, EventCategory } from './eventEnum';

export const ButtonEventDescriptions: Record<keyof typeof ButtonEvent, string> = {
  Agree_1: '온보딩 4 페이지에서 이용 약관 동의 클릭시',
  Agree_2: '온보딩 4 페이지에서 개인정보 수집 및 이용동의 클릭시',
  Agree_all: '온보딩 4 페이지에서 약관 전체 동의 클릭시',
  Aircon: '온보딩에서 에어컨 관련 선택시',
  Birth: '온보딩에서 출생년도 선택시',
  Clean_freq: '온보딩에서 청소 빈도 선택시',
  Clean_sensitivity: '온보딩에서 청결 예민도 선택시',
  Closeness: '온보딩에서 친밀도 선택시',
  Dorm_pass: '온보딩에서 합격여부 선택시',
  Drink: '온보딩에서 음주 여부 선택시',
  Drinking_freq: '온보딩에서 음주빈도 선택시',
  Eat: '온보딩에서 섭취여부 선택시',
  Email: '온보딩에서 이메일 인증 확인 버튼',
  Email_code: '온보딩에서 인증번호 확인 버튼',
  Game: '온보딩에서 게임여부 선택시',
  Heater: '온보딩에서 히터 관련 선택시',
  Item_sharing: '온보딩에서 물건공유 여부 선택시',
  Join_room: '방 참여하기 버튼 클릭시',
  Light_off: '온보딩에서 소등시간 선택시',
  Lifestyle: '온보딩에서 생활패턴 선택시',
  Mbti: '온보딩에서 MBTI 선택시',
  Major: '온보딩에서 학과 선택시',
  Morning: '온보딩에서 기상시간 선택시',
  Name: '온보딩에서 닉네임 중복 확인 버튼 클릭시',
  Nav_bar: '네비게이션 바 버튼 클릭시',
  Night: '온보딩에서 취침시간 선택시',
  Okay: '온보딩 4 페이지에서 확인 버튼 클릭시',
  Personality: '온보딩에서 성격 선택시',
  Phone_call: '온보딩에서 전화 여부 선택시',
  Room_card: '방 카드 클릭 시',
  Smoke: '온보딩에서 흡연여부 선택시',
  Sleep_habit: '온보딩에서 잠버릇 선택시',
  Student_id: '온보딩에서 학번 선택시',
  Study: '온보딩에서 공부 여부 선택시',
  Univ: '온보딩에서 대학교 입력 확인 버튼 클릭시',
  Verify_email: '온보딩에서 이메일 인증 확인 버튼',
};

export const InputEventDescriptions: Record<keyof typeof InputEvent, string> = {
  Univ: '온보딩에서 대학교 입력시',
  Major: '온보딩에서 학과 입력시',
  Email: '온보딩에서 학교 인증 이메일 입력시',
  Email_code: '온보딩에서 학교 인증 번호 입력시',
  Name: '온보딩에서 닉네임 입력시',
  Gender: '온보딩에서 성별 선택시',
  Birth: '온보딩에서 생일 입력시',
};

export const ScreenNameDescriptions: Record<keyof typeof ScreenName, string> = {
  Onboarding: '온보딩 화면',
  RoomRecommendation: '방 추천 화면',
  RoommateRecommendation: '룸메이트 추천 화면',
};

export const EventCategoryDescriptions: Record<keyof typeof EventCategory, string> = {
  Onboarding: '온보딩 관련 이벤트',
  RoomRecommendation: '방 추천 관련 이벤트',
  RoommateRecommendation: '룸메이트 추천 관련 이벤트',
  Lifestyle: '라이프스타일 관련 이벤트',
  Cozyhome: '코지홈 서비스 관련 이벤트',
};
