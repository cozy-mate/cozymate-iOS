import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';

import { generatePresignedUrl } from '@/server/s3/s3';

const uploadImagesAndGetKeys = async (
  assets: ImagePicker.ImagePickerAsset[],
): Promise<string[]> => {
  if (assets.length === 0) return [];

  const requests = assets.map((asset) => {
    const uri = asset.uri;
    const contentType =
      asset.mimeType ?? (uri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');
    const fileName = asset.fileName ?? uri.split('/').pop() ?? `upload_${Date.now()}`;
    return { fileName, contentType };
  });

  const { result } = await generatePresignedUrl({ requests });
  console.log(result);
  const uploadUrls = result.map((item) => item.uploadUrl);
  const s3Keys = result.map((item) => item.s3Key);

  const uploadPromises = assets.map(async (asset, index) => {
    const fileResponse = await fetch(asset.uri);
    const blob = await fileResponse.blob();
    const contentType =
      asset.mimeType ?? (asset.uri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');

    await fetch(uploadUrls[index], {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: blob,
    });

    return s3Keys[index];
  });

  return Promise.all(uploadPromises);
};

export const useUploadImagesAndGetKeys = (
  options?: Omit<
    UseMutationOptions<string[], Error, ImagePicker.ImagePickerAsset[], unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (images: ImagePicker.ImagePickerAsset[]) => uploadImagesAndGetKeys(images),
    ...options,
  });
};
