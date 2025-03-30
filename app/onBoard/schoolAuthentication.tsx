import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BorderPressBox from '@/components/common/borderPressBox';
import BorderTextButtonBox from '@/components/common/borderTextButtonBox';
import MajorSelectModalComponent from '@/components/onBoard/majorSelectModal';
import SchoolSelectModalComponent from '@/components/onBoard/schoolSelectModal';
import { UniversityItem } from '@/type/university';

export default function SchoolAuthentication() {
  const router = useRouter();

  const [university, setUniversity] = useState<number>(0);
  const [universityName, setUniversityName] = useState<string>('');

  const [major, setMajor] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const [isSchoolSelectModalOpen, setIsSchoolSelectModalOpen] = useState<boolean>(false);
  const [isMajorSelectModalOpen, setIsMajorSelectModalOpen] = useState<boolean>(false);

  const handleUniversity = (item: UniversityItem) => {
    setUniversity(item.id);
    setUniversityName(item.name);
    setMajor('');

    setIsSchoolSelectModalOpen(false);
  };

  const handleMajor = (major: string) => {
    setMajor(major);

    setIsMajorSelectModalOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="mt-14 gap-y-[24px] px-[20px]">
          <View className="gap-y-1 mx-2">
            <Text className="text-20 font-700 leading-20 text-emphasizedFont">
              룸메이트를 구하려면,
            </Text>
            <Text className="text-20 font-700 leading-20 text-emphasizedFont">
              <Text className="text-mainColor">학교 인증</Text>이 필요해요!
            </Text>
          </View>

          <View className="gap-y-[16px]">
            {/* 학교 입력 */}
            <BorderPressBox
              title="학교"
              value={universityName}
              placeholder="학교를 선택해주세요"
              onPress={() => setIsSchoolSelectModalOpen(true)}
            />

            <SchoolSelectModalComponent
              isVisible={isSchoolSelectModalOpen}
              handleValue={handleUniversity}
              closeModal={() => setIsSchoolSelectModalOpen(false)}
            />

            {/* 학과 입력 */}
            <BorderPressBox
              title="학과"
              value={major}
              placeholder="학과를 선택해주세요"
              onPress={() => {
                if (university === 0) {
                  Alert.alert('학교를 먼저 선택해주세요!');
                } else {
                  setIsMajorSelectModalOpen(true);
                }
              }}
            />

            <MajorSelectModalComponent
              isVisible={isMajorSelectModalOpen}
              universityId={university}
              handleValue={handleMajor}
              closeModal={() => setIsMajorSelectModalOpen(false)}
            />

            {/* 학교 이메일 입력 */}
            <BorderTextButtonBox
              title="학교 이메일"
              value={email}
              handleValue={(e: string) => setEmail(e)}
              placeholder="학교 이메일을 입력해주세요"
              buttonText="인증번호 전송"
              buttonPress={() => router.push('/onBoard/personalInfo')}
              canPress={email !== ''}
            />

            {/* 인증번호 입력 */}
            <BorderTextButtonBox
              title="인증번호 확인"
              value={code}
              handleValue={(e: string) => setCode(e)}
              placeholder="인증 번호를 입력해주세요"
              buttonText="인증번호 확인"
              buttonPress={() => router.push('/onBoard/personalInfo')}
              canPress={code !== ''}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
