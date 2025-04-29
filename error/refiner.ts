import { AxiosError } from 'axios';

export const errorRefiner = (error: any) => {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.status,
      message: error.message,
      code: error.code,
      url: error.config?.url,
    };
  } else {
    return error;
  }
};
