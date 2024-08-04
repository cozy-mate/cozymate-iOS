import CustomRadioInputBox from '@components/common/customRadioInputBox';
import CustomTextInputBox from '@components/common/customTextInputBox';
import { lifeStyleState } from '@recoil/recoil';
import { LifeStyle } from '@recoil/type';
import { BasicLifeStyleScreenProps } from '@type/param/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import BackHeader from 'src/layout/backHeader';

type Item = {
  index: number;
  value: string;
  name: string;
  select: boolean;
};

const BasicInformationComponent = ({ navigation }: BasicLifeStyleScreenProps) => {
  const [lifeStyle, setLifeStyle] = useRecoilState(lifeStyleState);

  const [name, setName] = useState<string>('정진혁');
  const [birthYear, setBirthYear] = useState<string>('1999');

  const [admissionYear, setAdmissionYear] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [numOfRoommate, setNumOfRoommate] = useState<number>(0);
  const [acceptance, setAcceptance] = useState<string>('');

  const [numOfRoommateItems, setNumOfRoommateItems] = useState<Item[]>([
    { index: 1, value: '2', name: '2인', select: false },
    { index: 2, value: '3', name: '3인', select: false },
    { index: 3, value: '4', name: '4인', select: false },
    { index: 4, value: '5', name: '5인', select: false },
    { index: 5, value: '6', name: '6인', select: false },
  ]);

  const [acceptanceItems, setAcceptanceItems] = useState<Item[]>([
    { index: 1, value: '합격', name: '합격', select: false },
    { index: 2, value: '대기중', name: '대기중', select: false },
    { index: 3, value: '예비번호', name: '예비번호를 받았어요!', select: false },
  ]);

  const toNext = async (): Promise<void> => {
    setLifeStyle((prevState: LifeStyle) => ({
      ...prevState,
      admissionYear: admissionYear,
      major: major,
      numOfRoommate: numOfRoommate,
      acceptance: acceptance,
    }));

    navigation.navigate('EssentialLifeStyleScreen');
  };

  const [showMajorInput, setShowMajorInput] = useState<boolean>(false);
  const [showRoommateInput, setShowRoommateInput] = useState<boolean>(false);
  const [showAcceptance, setShowAcceptance] = useState<boolean>(false);

  useEffect(() => {
    console.log(lifeStyle);
  }, [lifeStyle]);

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <BackHeader title="기본정보" buttonString="다음" pressFunc={toNext} />
      <ScrollView className="px-5">
        {showAcceptance && (
          <CustomRadioInputBox
            title="기숙사 합격여부를 선택해주세요"
            value={acceptance}
            setValue={setAcceptance}
            items={acceptanceItems}
            setItems={setAcceptanceItems}
            isTime={false}
          />
        )}

        {showRoommateInput && (
          <CustomRadioInputBox
            title="신청실의 인원을 선택해주세요"
            value={numOfRoommate}
            setValue={(text) => {
              setNumOfRoommate(text);
              setShowAcceptance(!!text);
            }}
            items={numOfRoommateItems}
            setItems={setNumOfRoommateItems}
            isTime={false}
          />
        )}

        {showMajorInput && (
          <CustomTextInputBox
            title="학과를"
            value={major}
            setValue={(text) => {
              setMajor(text);
              setShowRoommateInput(!!text);
            }}
            placeholder="경영학과"
          />
        )}

        <CustomTextInputBox
          title="학번을"
          value={admissionYear}
          setValue={(text) => {
            setAdmissionYear(text);
            setShowMajorInput(!!text);
          }}
          placeholder="23"
        />

        <CustomTextInputBox
          title="출생년도를"
          value={birthYear}
          setValue={setBirthYear}
          placeholder="2002"
        />

        <CustomTextInputBox title="이름을" value={name} setValue={setName} placeholder="김코지" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInformationComponent;
