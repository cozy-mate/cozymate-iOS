import { PostAxiosInstance } from '@axios/axios.method';
import { UploadImageToS3Response } from '@server/responseTypes/image';
import { Asset } from 'react-native-image-picker';

// Asset 객체에 대해서만 사용 가능합니다
export const uploadAssetImageToS3 = async (files: Asset[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    const uri = file.uri || '';
    const fileName = file.fileName || uri.split('/').pop() || '';
    const fileType = uri.includes('https') ? `image/${fileName.split('.').pop()}` : file.type;

    formData.append('files', {
      uri: uri,
      type: fileType,
      name: fileName,
    });
  });
  const response = await PostAxiosInstance<UploadImageToS3Response>(`/api/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 범용적으로 사용 가능합니다
export const uploadImageToS3 = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('file', file);
  });
  const response = await PostAxiosInstance<UploadImageToS3Response>(`/api/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
