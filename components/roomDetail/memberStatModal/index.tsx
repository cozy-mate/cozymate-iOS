import { Modal, Text, View } from 'react-native';

import { getPersona } from '@/constants/items/characterItem';
import { ChipItem } from '@/type/room';

interface MemberStatModalComponentProps {
  isVisible: boolean;
  closeModal: () => void;
  item: ChipItem;
}

const MemberStatModalComponent: React.FC<MemberStatModalComponentProps> = ({
  isVisible,
  closeModal,
  item,
}) => {
  const getTextColor = () => {
    if (item.color === 'blue') {
      return 'text-mainColor';
    } else if (item.color === 'red') {
      return 'text-warningColor';
    } else {
      return 'text-emphasizeFont';
    }
  };

  const translateAnswer = (value: string | number) => {
    if (item.title === '기상시간' || item.title === '취침시간' || item.title === '소등시간')
      return (value as number) < 12 ? `오전 ${value}시` : `오후 ${value}시`;
    else if (item.title === '신청실') return `${value}인 1실`;
    else if (item.title === '출생년도') return `${value}년`;
    else return value;
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View
        onTouchEnd={closeModal}
        className="flex h-screen w-screen items-center justify-center bg-black/55"
      >
        <View
          onTouchEnd={(e) => e.stopPropagation()}
          className="w-[334px] gap-y-[16px] rounded-xl bg-white p-[16px] pt-[20px]"
        >
          <Text className={`text-16 font-600 leading-16 text-center ${getTextColor()}`}>
            {item.title}
          </Text>

          <View>
            {item.memberList.map((member, index) => (
              <View
                key={member.memberDetail.memberId}
                className={`flex flex-row items-center gap-x-[8px] py-[12px] border-b border-b-[#F1F2F4] ${index === 0 && 'pt-[8px]'}
                ${index === item.memberList.length - 1 && 'pb-[8px] border-b-0'}`}
              >
                <View className="flex flex-row items-center gap-x-[6px]">
                  {getPersona(member.memberDetail.persona, 24, 24)}
                  <Text className="text-14 font-500 leading-14 text-emphasizedFont">
                    {member.memberDetail.nickname}
                  </Text>
                </View>

                {Object.entries(member.memberStat).map(([key, value]) => (
                  <Text key={key} className="text-14 font-500 leading-14 text-colorFont">
                    {translateAnswer(value)}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MemberStatModalComponent;
