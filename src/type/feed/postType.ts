export interface PostCardType {
    id: number;
    content: string;
    writer : {
        id: number;
        nickname: string;
        persona: string;
    }
    imageList : string[];
    commentCount: number;
    createdAt: string;
    updatedAt: string;
};

export interface CommentType {
    id: number;
    content: string;
    writer : {
        id: number;
        nickname: string;
        persona: string;
    }
    createdAt: string;
    updatedAt: string;
};


export interface PostViewType {
    post: PostCardType;
    commentList: CommentType[];
};

export interface PostCreateType {
    memberId: number;
    content: string;
    imageList: string[];
};

export interface PostEditType {
    memberId: number;
    content: string;
    imageList: string[];
};