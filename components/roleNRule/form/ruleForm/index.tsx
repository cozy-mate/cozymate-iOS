import { View } from 'react-native';

import CustomTextarea from '@/components/common/customInput/customTextarea';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import { CreateRuleRequest } from '@/server/rule/request';

interface RuleFormComponentProps {
  ruleForm: CreateRuleRequest;
  setRuleForm: React.Dispatch<React.SetStateAction<CreateRuleRequest>>;
}

const RuleFormComponent: React.FC<RuleFormComponentProps> = ({ ruleForm, setRuleForm }) => {
  return (
    <View className="gap-y-[48px]">
      <CustomTextInput
        title="규칙을 입력해주세요"
        value={ruleForm.content}
        handleValue={(e: string) => setRuleForm((prev) => ({ ...prev, content: e }))}
        placeholder="규칙을 입력해주세요"
        maxLength={20}
      />

      <CustomTextarea
        title="메모를 추가해주세요"
        additionalTitle=" (선택)"
        value={ruleForm.memo}
        handleValue={(e: string) => setRuleForm((prev) => ({ ...prev, memo: e }))}
        placeholder="내용을 입력해주세요"
        height="h-[120px]"
        maxLength={50}
      />
    </View>
  );
};

export default RuleFormComponent;
