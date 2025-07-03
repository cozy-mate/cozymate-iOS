import { UpdateRoleRequest } from '@/server/role/request';
import { UpdateRuleRequest } from '@/server/rule/request';
import { UpdateTodoRequest } from '@/server/todo/request';

export interface SelectedItem {
  id: number;
  type: string;
  content: string;

  todoItem: UpdateTodoRequest;
  roleItem: UpdateRoleRequest;
  ruleItem: UpdateRuleRequest;
}
