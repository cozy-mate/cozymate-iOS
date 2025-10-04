/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import axiosInstance from '@/axios/axios.Instance';

export const PostAxiosInstance = async <TResponse, TRequest extends any>(
  url: string,
  data?: TRequest,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
  const response = await axiosInstance.post(url, data, config);
  return response;
};

export const GetAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(url, config);
  return response;
};

export const PatchAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.patch(url, data, config);
  return response;
};

export const DeleteAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.delete(url, data);
  return response;
};

export const PutAxiosInstance = async <TResponse, TRequest extends any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
  const response = await axiosInstance.put(url, data, config);
  return response;
};
