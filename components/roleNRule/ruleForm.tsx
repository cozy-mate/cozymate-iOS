import { View } from 'react-native';

import { CreateRuleRequest } from '@/server/rule/request';

import CustomTextareaComponent from '../common/customTextAreaBox';
import CustomTextInputComponent from '../common/customTextInput';

interface RuleFormComponentProps {
  ruleForm: CreateRuleRequest;
  setRuleForm: React.Dispatch<React.SetStateAction<CreateRuleRequest>>;
}

const RuleFormComponent: React.FC<RuleFormComponentProps> = ({ ruleForm, setRuleForm }) => {
  return (
    <View className="gap-y-[48px]">
      <CustomTextInputComponent
        title="규칙을 입력해주세요"
        value={ruleForm.content}
        handleValue={(e: string) => setRuleForm((prev) => ({ ...prev, content: e }))}
        placeholder="규칙을 입력해주세요"
      />

      <CustomTextareaComponent
        title="메모를 추가해주세요!"
        value={ruleForm.memo}
        handleValue={(e: string) => setRuleForm((prev) => ({ ...prev, memo: e }))}
        placeholder="내용을 입력해주세요"
      />
    </View>
  );
};

export default RuleFormComponent;
