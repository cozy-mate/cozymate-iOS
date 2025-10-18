import axios, { AxiosInstance, isAxiosError } from 'axios';

import { reissueToken } from '@/server/auth/auth';
import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/token';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// JWT 토큰 기반 API 요청
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// 토큰 관련 에러 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (isAxiosError(error) && error.response?.status === 401) {
      // 이미 재시도한 요청이면 에러 반환
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // 토큰 재발급 중이면 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          deleteToken();
          processQueue(error, null);
          return Promise.reject(error);
        }

        const { result } = await reissueToken(refreshToken);
        const newAccessToken = result.tokenResponseDTO.accessToken;
        const newRefreshToken = result.tokenResponseDTO.refreshToken;

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        deleteToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.data?.code === 'AUTH_001') {
      console.log('잘못된 토큰');
      deleteToken();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
