export type SortTypeValue = 'AVERAGE_RATE' | 'LATEST' | 'CLOSING_SOON';

export const sortTypeItem: Record<SortTypeValue, string> = {
  AVERAGE_RATE: '평균일치율순',
  LATEST: '최신순',
  CLOSING_SOON: '마감순',
};
