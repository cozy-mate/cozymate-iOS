export interface GetS3UrlsResponse {
  result: {
    imageUrlList: string[];
  };
}

export interface GeneratePresignedUrlResponse {
  result: {
    uploadUrl: string;
    s3Key: string;
  }[];
}

export interface DeleteFileResponse {
  result: boolean;
}
