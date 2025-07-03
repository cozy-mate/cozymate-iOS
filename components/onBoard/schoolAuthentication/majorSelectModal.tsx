import { useEffect, useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableHighlight,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetUniversityInfo } from '@/hooks/university/university';

interface MajorSelectModalComponentProps {
  isVisible: boolean;
  universityId: number;
  handleValue: (e: string) => void;
  closeModal: () => void;
}

const MajorSelectModalComponent: React.FC<MajorSelectModalComponentProps> = ({
  isVisible,
  universityId,
  handleValue,
  closeModal,
}) => {
  const [majorList, setMajorList] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);

  const [keyword, setkeyword] = useState<string>('');

  const { data } = useGetUniversityInfo(universityId);

  useEffect(() => {
    if (data !== undefined) {
      setMajorList(data?.result.departments);
      setFilteredList(data?.result.departments);
    }
  }, [data]);

  useEffect(() => {
    const filtered = majorList.filter((univ) => univ.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredList(filtered);
  }, [keyword, majorList]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return <Text>{text}</Text>;

    const lowerText = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const startIndex = lowerText.indexOf(lowerHighlight);

    if (startIndex === -1) return <Text>{text}</Text>;

    const beforeMatch = text.substring(0, startIndex);
    const matchText = text.substring(startIndex, startIndex + highlight.length);
    const afterMatch = text.substring(startIndex + highlight.length);

    return (
      <Text>
        {beforeMatch}
        <Text className="text-mainColor">{matchText}</Text>
        {afterMatch}
      </Text>
    );
  };

  return (
    isVisible && (
      <Modal>
        <SafeAreaView className="mt-[63px] gap-y-[20px] flex-1 bg-white">
          <View className="flex flex-row items-center gap-x-[8px] px-[20px]">
            <TextInput
              value={keyword}
              onChangeText={(e: string) => setkeyword(e)}
              placeholder="학과를 입력해주세요"
              placeholderTextColor={'#ACADB4'}
              className="bg-colorBox rounded-xl p-[16px] InputMedium14 text-basicFont flex-1"
            />

            <Pressable onPress={closeModal} className="px-[8px] py-[11.5px]">
              <Text className="Medium14 text-emphasizedFont">취소</Text>
            </Pressable>
          </View>

          <View className="flex-1">
            <FlatList
              data={filteredList}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => handleValue(item)}
                  underlayColor={'#F2F2F2'}
                  className="rounded-[10px] bg-white mx-[20px]"
                >
                  <View className="px-[8px] py-[20px] rounded-[10px]">
                    <Text className="Medium16 text-emphasizedFont">
                      {highlightText(item, keyword)}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={() => <View className="h-[4px]" />}
              ListFooterComponent={() => <View className="h-[64px] bg-white" />}
            />
          </View>
        </SafeAreaView>
      </Modal>
    )
  );
};

export default MajorSelectModalComponent;
