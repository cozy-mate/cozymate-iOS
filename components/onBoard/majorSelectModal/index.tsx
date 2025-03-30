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

import { getUnivesityInfo } from '@/apis/university/university';

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

  useEffect(() => {
    const getMajorList = async () => {
      const response = await getUnivesityInfo(universityId);

      setMajorList(response.result.departments);
      setFilteredList(response.result.departments);
    };

    getMajorList();
  }, []);

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
        <View className="mt-[63px] px-[20px] gap-y-[20px] flex-1">
          <View className="flex flex-row items-center gap-x-[8px]">
            <TextInput
              value={keyword}
              onChangeText={(e: string) => setkeyword(e)}
              placeholder="학과를 입력해주세요"
              placeholderTextColor={'#ACADB4'}
              className="bg-colorBox rounded-xl p-[16px] text-14 font-500 text-basicFont flex-1"
            />

            <Pressable onPress={closeModal} className="px-[8px] py-[11.5px]">
              <Text className="text-14 font-500 leading-14 text-emphasizedFont">취소</Text>
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
                  className="rounded-[10px] bg-white"
                >
                  <View className="px-[8px] py-[20px] rounded-[10px]">
                    <Text className="text-16 font-500 leading-16 text-emphasizedFont">
                      {highlightText(item, keyword)}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={() => <View className="h-[4px]" />}
            />
          </View>
        </View>
      </Modal>
    )
  );
};

export default MajorSelectModalComponent;
