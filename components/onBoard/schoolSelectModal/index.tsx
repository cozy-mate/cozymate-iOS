import { useEffect, useState } from 'react';
import {
  View,
  Modal,
  TouchableHighlight,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';

import { getUniversityList } from '@/apis/university/university';
import { UniversityItem } from '@/type/university';

interface SchoolSelectModalComponentProps {
  isVisible: boolean;
  handleValue: (item: UniversityItem) => void;
  closeModal: () => void;
}

const SchoolSelectModalComponent: React.FC<SchoolSelectModalComponentProps> = ({
  isVisible,
  handleValue,
  closeModal,
}) => {
  const [universityList, setuniversityList] = useState<UniversityItem[]>([]);

  const [keyword, setkeyword] = useState<string>('');
  const [filteredList, setFilteredList] = useState<UniversityItem[]>([]);

  useEffect(() => {
    const getUnivList = async () => {
      const response = await getUniversityList();

      setuniversityList(response.result.universityList);
      setFilteredList(response.result.universityList);
    };
    getUnivList();
  }, []);

  useEffect(() => {
    const filtered = universityList.filter((univ) =>
      univ.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredList(filtered);
  }, [keyword, universityList]);

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
              placeholder="학교를 입력해주세요"
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => handleValue(item)}
                  underlayColor={'#F2F2F2'}
                  className="rounded-[10px] bg-white"
                >
                  <View className="px-[8px] py-[20px] rounded-[10px]">
                    <Text className="text-16 font-500 leading-16 text-emphasizedFont">
                      {highlightText(item.name, keyword)}
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

export default SchoolSelectModalComponent;
