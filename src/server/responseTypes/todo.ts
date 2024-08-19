export interface DeleteTodoResponse {
  result: string;
}

export interface GetTodoDataResponse {
  result: {
    timePoint: string;
    myTodoList: {
      persona: number;
      mateTodoList: {
        id: number;
        content: string;
        completed: boolean;
      }[];
    };
    mateTodoList: {
      additionalProp1: {
        persona: number;
        mateTodoList: {
          id: number;
          content: string;
          completed: boolean;
        }[];
      };
      additionalProp2: {
        persona: number;
        mateTodoList: {
          id: number;
          content: string;
          completed: boolean;
        }[];
      };
      additionalProp3: {
        persona: number;
        mateTodoList: {
          id: number;
          content: string;
          completed: boolean;
        }[];
      };
      additionalProp4: {
        persona: number;
        mateTodoList: {
          id: number;
          content: string;
          completed: boolean;
        }[];
      };
      additionalProp5: {
        persona: number;
        mateTodoList: {
          id: number;
          content: string;
          completed: boolean;
        }[];
      };
    };
  };
}

export interface ChangeTodoStateResponse {
  result: string;
}

export interface AddMyTodoResponse {
  result: string;
}
