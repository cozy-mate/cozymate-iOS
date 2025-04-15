import { View } from 'react-native';

import { CreateRoleRequest } from '@/apis/role/request';
import { useGetMyRoomDetail } from '@/hooks/room/room';

import CustomTextInputComponent from '../common/customTextInput';

import DaySelectComponent from './daySelect';
import RoleMateSelectComponent from './roleMateSelect';

interface RoleFormComponentProps {
  roleForm: CreateRoleRequest;
  setRoleForm: React.Dispatch<React.SetStateAction<CreateRoleRequest>>;
}

const RoleFormComponent: React.FC<RoleFormComponentProps> = ({ roleForm, setRoleForm }) => {
  const { data: memberList } = useGetMyRoomDetail();

  return (
    <View className="gap-y-[48px]">
      <CustomTextInputComponent
        title="역할을 입력해주세요"
        value={roleForm.content}
        handleValue={(e: string) => setRoleForm((prev) => ({ ...prev, content: e }))}
        placeholder="역할을 입력해주세요"
      />

      {memberList?.result.mateDetailList !== undefined && (
        <RoleMateSelectComponent
          title="담당자를 선택해주세요"
          value={roleForm.mateIdNameList}
          items={memberList?.result.mateDetailList}
          handleValue={(mate) => setRoleForm((prev) => ({ ...prev, mateIdNameList: mate }))}
        />
      )}

      <DaySelectComponent
        title="정해진 요일을 선택해주세요"
        value={roleForm.repeatDayList}
        handleValue={(days) => setRoleForm((prev) => ({ ...prev, repeatDayList: days }))}
      />
    </View>
  );
};

export default RoleFormComponent;
