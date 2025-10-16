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

  const uploadUrls = result.map((item) => item.uploadUrl);
  const s3Keys = result.map((item) => item.s3Key);

  const uploadPromises = assets.map(async (asset, index) => {
    const fileResponse = await fetch(asset.uri);
    if (!fileResponse.ok) {
      throw new Error('파일을 불러오는데 실패했어요');
    }
    const blob = await fileResponse.blob();
    const contentType =
      asset.mimeType ?? (asset.uri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');

    const uploadResponse = await fetch(uploadUrls[index], {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: blob,
    });

    if (!uploadResponse.ok) {
      throw new Error('S3에 파일을 업로드하는데 실패했어요');
    }

    return s3Keys[index];
  });

  return Promise.all(uploadPromises);
};

const guessContentTypeFromName = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.heic')) return 'image/heic';
  if (lower.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
};

const uploadMixedImagesAndGetKeys = async (
  images: (ImagePicker.ImagePickerAsset | string)[],
): Promise<string[]> => {
  if (images.length === 0) return [];

  const requests = images.map((item) => {
    if (typeof item === 'string') {
      const clean = item.split('?')[0].split('#')[0];
      const fileName = clean.split('/').pop() ?? `upload_${Date.now()}`;
      const contentType = guessContentTypeFromName(fileName);
      return { fileName, contentType };
    }
    const uri = item.uri;
    const fileName = item.fileName ?? uri.split('/').pop() ?? `upload_${Date.now()}`;
    const contentType = item.mimeType ?? guessContentTypeFromName(fileName);
    return { fileName, contentType };
  });

  const { result } = await generatePresignedUrl({ requests });
  const uploadUrls = result.map((r) => r.uploadUrl);
  const s3Keys = result.map((r) => r.s3Key);

  const uploadPromises = images.map(async (item, index) => {
    const sourceUri = typeof item === 'string' ? item : item.uri;
    const res = await fetch(sourceUri);

    const blob = await res.blob();
    const contentType = requests[index].contentType;

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

// Mixed images (existing URL strings or new ImagePicker assets) -> final s3 keys preserving order
export const useBuildPostImageKeys = (
  options?: Omit<
    UseMutationOptions<string[], Error, (ImagePicker.ImagePickerAsset | string)[], unknown>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (images: (ImagePicker.ImagePickerAsset | string)[]) =>
      uploadMixedImagesAndGetKeys(images),
    ...options,
  });
};
