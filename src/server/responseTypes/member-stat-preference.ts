import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

export interface GetPreferenceListResponse {
  result: {
    preferenceList: LifestyleOptionKey[];
  };
}

export interface AddPreferenceListResponse {
  result: number;
}

export interface UpdatePreferenceListResponse {
  result: number;
}
