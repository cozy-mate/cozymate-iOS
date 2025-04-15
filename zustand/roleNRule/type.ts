import { UpdateRoleRequest } from '@/apis/role/request';
import { UpdateRuleRequest } from '@/apis/rule/request';
import { UpdateTodoRequest } from '@/apis/todo/request';

export interface SelectedItem {
  id: number;
  type: string;
  content: string;

  todoItem?: UpdateTodoRequest;

  roleItem?: UpdateRoleRequest;

  ruleItem?: UpdateRuleRequest;
}
