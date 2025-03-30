export interface GetMyUniversityInfoResponse {
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
      id: number;
      name: string;
    }[];
  };
}

export interface GetUniversityInfoResponse {
  result: {
    id: number;
    name: string;
    mailPattern: string;
    dormitoryNames: string[];
    departments: string[];
  };
}
