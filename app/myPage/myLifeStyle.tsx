import { Suspense, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopButtonIcon from '@/assets/icons/myPage/topButton.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import CustomMultiSelect from '@/components/common/customInput/customMultiSelect';
import CustomNumberPad from '@/components/common/customInput/customNumberPad';
import CustomSelect from '@/components/common/customInput/customSelect';
import CustomTextarea from '@/components/common/customInput/customTextarea';
import CustomTimeSelect from '@/components/common/customInput/customTimeSelect';
import LoadingComponent from '@/components/common/loading';
import {
  numOfRoommateItems,
  cleaningFrequencyItems,
  drinkingFrequencyItems,
  heatingIntensityItems,
  intimacyItems,
  lifePatternItems,
  mbtiItems,
  noiseSensitivityItems,
  dormJoiningStatusItems,
  smokingStatusItems,
  sleepingHabitsItems,
  coolingIntensityItems,
  sharingStatusItems,
  gamingStatusItems,
  callingStatusItems,
  studyingStatusItems,
  eatingStatusItems,
  cleannessSensitivityItems,
  personalitiesItems,
} from '@/constants/items/lifeStyleItem';
import { useSuspenseGetMyDetail, useUpdateMemberDetail } from '@/hooks/member-stat/member-stat';
import { useGetMyUniversityInfo } from '@/hooks/university/university';

function MyLifeStyleComponent() {
  const { data } = useSuspenseGetMyDetail();

  const { data: dormitories } = useGetMyUniversityInfo();

  const dormitoryItems = dormitories.result.dormitoryNames.map((item, index) => ({
    index,
    title: item,
    value: item,
  }));

  const [lifeStyle, setLifeStyle] = useState(data.result.memberStatDetail);

  const { mutateAsync: updateLifeStyle } = useUpdateMemberDetail();

  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const toTop = () => {
    scrollRef.current?.scrollToPosition(0, 0);
  };

  const isDisable =
    lifeStyle.admissionYear === undefined ||
    lifeStyle.admissionYear === '' ||
    lifeStyle.dormName === '' ||
    lifeStyle.numOfRoommate === '' ||
    lifeStyle.dormJoiningStatus === '' ||
    lifeStyle.wakeUpTime === undefined ||
    lifeStyle.sleepingTime === undefined ||
    lifeStyle.turnOffTime === undefined ||
    lifeStyle.smokingStatus === '' ||
    lifeStyle.sleepingHabits === undefined ||
    lifeStyle.sleepingHabits.length === 0 ||
    lifeStyle.coolingIntensity === '' ||
    lifeStyle.heatingIntensity === '' ||
    lifeStyle.intimacy === '' ||
    lifeStyle.lifePattern === '' ||
    lifeStyle.sharingStatus === '' ||
    lifeStyle.gamingStatus === '' ||
    lifeStyle.callingStatus === '' ||
    lifeStyle.studyingStatus === '' ||
    lifeStyle.eatingStatus === '' ||
    lifeStyle.cleannessSensitivity === '' ||
    lifeStyle.noiseSensitivity === '' ||
    lifeStyle.cleaningFrequency === '' ||
    lifeStyle.drinkingFrequency === '' ||
    lifeStyle.personalities === undefined ||
    lifeStyle.personalities.length === 0 ||
    lifeStyle.mbti === '' ||
    lifeStyle.selfIntroduction.length > 200;

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px] pb-[8px]">
          <BackHeaderComponent>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                updateLifeStyle(lifeStyle);
              }}
              disabled={isDisable}
              className={`rounded-md px-[20px] py-[10px] ${isDisable ? 'bg-[#C4C4C4]' : 'bg-subColor1'}`}
            >
              <Text className={`Semibold14 ${isDisable ? 'text-white' : 'text-mainColor'}`}>
                수정
              </Text>
            </Pressable>
          </BackHeaderComponent>
        </View>
      </TouchableWithoutFeedback>

      {data?.result.memberStatDetail !== undefined && lifeStyle !== undefined && (
        <KeyboardAwareScrollView
          ref={scrollRef}
          contentContainerStyle={{
            paddingBottom: 80,
            paddingTop: 40,
            paddingHorizontal: 20,
            rowGap: 64,
          }}
        >
          <CustomNumberPad
            title="학번을 입력해주세요"
            value={lifeStyle.admissionYear}
            handleValue={(e: string) => {
              setLifeStyle((prev) => ({ ...prev, admissionYear: e }));
            }}
            placeholder="ex. 23"
          />

          <CustomSelect
            title="신청한 기숙사를 선택해주세요"
            value={lifeStyle.dormName}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, dormName: String(e) }));
            }}
            items={dormitoryItems}
          />

          <CustomSelect
            title="신청실의 인원을 선택해주세요"
            value={lifeStyle.numOfRoommate}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, numOfRoommate: String(e) }));
            }}
            items={numOfRoommateItems}
          />

          <CustomSelect
            title="기숙사 합격여부를 선택해주세요"
            value={lifeStyle.dormJoiningStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, dormJoiningStatus: String(e) }));
            }}
            items={dormJoiningStatusItems}
          />

          <CustomTimeSelect
            title="기상시간을 선택해주세요"
            value={lifeStyle.wakeUpTime}
            onChange={(e: number) => {
              setLifeStyle((prev) => ({ ...prev, wakeUpTime: Number(e) }));
            }}
          />

          <CustomTimeSelect
            title="취침시간을 선택해주세요"
            value={lifeStyle.sleepingTime}
            onChange={(e: number) => {
              setLifeStyle((prev) => ({ ...prev, sleepingTime: Number(e) }));
            }}
          />

          <CustomTimeSelect
            title="소등시간을 선택해주세요"
            value={lifeStyle.turnOffTime}
            onChange={(e: number) => {
              setLifeStyle((prev) => ({ ...prev, turnOffTime: Number(e) }));
            }}
          />

          <CustomSelect
            title="흡연여부를 선택해주세요"
            value={lifeStyle.smokingStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, smokingStatus: String(e) }));
            }}
            items={smokingStatusItems}
          />

          <CustomMultiSelect
            title="잠버릇을 선택해주세요 (중복선택 가능)"
            value={lifeStyle.sleepingHabits}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, sleepingHabits: e }));
            }}
            items={sleepingHabitsItems}
          />

          <CustomSelect
            title="에어컨 강도를 선택해주세요"
            value={lifeStyle.coolingIntensity}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, coolingIntensity: String(e) }));
            }}
            items={coolingIntensityItems}
          />

          <CustomSelect
            title="히터 강도를 선택해주세요"
            value={lifeStyle.heatingIntensity}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, heatingIntensity: String(e) }));
            }}
            items={heatingIntensityItems}
          />

          <CustomSelect
            title="생활 패턴을 선택해주세요"
            value={lifeStyle.lifePattern}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, lifePattern: String(e) }));
            }}
            items={lifePatternItems}
          />

          <CustomSelect
            title="룸메이트와의 원하는 친밀도를 선택해주세요"
            value={lifeStyle.intimacy}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, intimacy: String(e) }));
            }}
            items={intimacyItems}
          />

          <CustomSelect
            title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
            value={lifeStyle.sharingStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, sharingStatus: String(e) }));
            }}
            items={sharingStatusItems}
          />

          <CustomSelect
            title="방 안에서의 게임 여부를 선택해주세요"
            value={lifeStyle.gamingStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, gamingStatus: String(e) }));
            }}
            items={gamingStatusItems}
          />

          <CustomSelect
            title="방 안에서의 전화 여부를 선택해주세요"
            value={lifeStyle.callingStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, callingStatus: String(e) }));
            }}
            items={callingStatusItems}
          />

          <CustomSelect
            title="방 안에서의 공부 여부를 선택해주세요"
            value={lifeStyle.studyingStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, studyingStatus: String(e) }));
            }}
            items={studyingStatusItems}
          />

          <CustomSelect
            title="방 안에서의 섭취여부를 선택해주세요"
            value={lifeStyle.eatingStatus}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, eatingStatus: String(e) }));
            }}
            items={eatingStatusItems}
          />

          <CustomSelect
            title="청결 예민도를 선택해주세요"
            value={lifeStyle.cleannessSensitivity}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, cleannessSensitivity: String(e) }));
            }}
            items={cleannessSensitivityItems}
          />

          <CustomSelect
            title="소음 예민도를 선택해주세요"
            value={lifeStyle.noiseSensitivity}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, noiseSensitivity: String(e) }));
            }}
            items={noiseSensitivityItems}
          />

          <CustomSelect
            title="청소 빈도를 선택해주세요"
            value={lifeStyle.cleaningFrequency}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, cleaningFrequency: String(e) }));
            }}
            items={cleaningFrequencyItems}
          />

          <CustomSelect
            title="음주 빈도를 선택해주세요"
            value={lifeStyle.drinkingFrequency}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, drinkingFrequency: String(e) }));
            }}
            items={drinkingFrequencyItems}
          />

          <CustomMultiSelect
            title="성격을 선택해주세요 (중복선택 가능)"
            value={lifeStyle.personalities}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, personalities: e }));
            }}
            items={personalitiesItems}
          />

          <CustomSelect
            title="MBTI를 선택해주세요"
            value={lifeStyle.mbti}
            handleValue={(e) => {
              setLifeStyle((prev) => ({ ...prev, mbti: String(e) }));
            }}
            items={mbtiItems}
            isGrid={true}
          />

          <CustomTextarea
            title="하고싶은 말을 적어주세요 (선택)"
            value={lifeStyle.selfIntroduction}
            handleValue={(e: string) => setLifeStyle((prev) => ({ ...prev, selfIntroduction: e }))}
            placeholder="내용을 입력해주세요"
            height="h-[270px]"
          />
        </KeyboardAwareScrollView>
      )}

      <TouchableOpacity
        onPress={toTop}
        className="absolute bottom-[60px] right-[20px] z-50 bg-white rounded-full"
      >
        <TopButtonIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function MyLifeStyle() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <MyLifeStyleComponent />
    </Suspense>
  );
}
