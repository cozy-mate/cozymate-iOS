import { lifeStyleState } from '@recoil/recoil';
import { AdditionalLifeStyleScreenProps } from '@type/param/loginStack';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useRecoilState } from 'recoil';
import BackHeader from 'src/layout/backHeader';

const AdditionalInformationComponent = ({ navigation }: AdditionalLifeStyleScreenProps) => {
  const [lifeStyle, setLifeStyle] = useRecoilState(lifeStyleState);

  const toPrev = () => {
    navigation.navigate('EssentialLifeStyleScreen');
  };

  const toNext = () => {
    navigation.navigate('RoomMateScreen');
  };

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <BackHeader
        title="선택정보"
        buttonString="완료"
        leftPressFunc={toPrev}
        rightPressFunc={toNext}
        canNext={true}
        width={400}
      />
      <ScrollView className="px-5">
        <View></View>

        <View></View>

        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdditionalInformationComponent;
