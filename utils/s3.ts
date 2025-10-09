export const parseS3KeyFromUrl = (url: string): string => {
  const clean = url.split('?')[0].split('#')[0];
  const last = clean.split('/').pop() ?? '';
  const folder = 'posts';
  return `${folder}/${last}`;
};

export const buildS3Key = (key: string, ext?: string) => {
  return ext && ext.length > 0 ? `posts/${key}.${ext}` : `posts/${key}`;
};
