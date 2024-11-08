export interface GetUserUniversityResponse {
  result: {
    id: number;
    name: string;
    mailPattern: string;
    dormitoryNames: string[];
    departments: string[];
  };
}

export interface GetUniversityListResponse {
  result: {
    universityList: {
      name: string;
      id: number;
    }[];
  };
}

export interface GetUniversityDataResponse {
  result: {
    name: string;
    mailPattern: string;
    dormitoryNames: string[];
    departments: string[];
  };
}
