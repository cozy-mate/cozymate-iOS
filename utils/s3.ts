const S3_FOLDER = 'posts';

export const parseS3KeyFromUrl = (url: string): string => {
  if (!url) {
    throw new Error('URL cannot be empty');
  }
  const clean = url.split('?')[0].split('#')[0];
  const last = clean.split('/').pop() ?? '';
  if (!last) {
    throw new Error('Invalid URL: no path segment found');
  }
  return `${S3_FOLDER}/${last}`;
};

export const buildS3Key = (key: string, ext?: string) => {
  return ext && ext.length > 0 ? `${S3_FOLDER}/${key}.${ext}` : `${S3_FOLDER}/${key}`;
};
