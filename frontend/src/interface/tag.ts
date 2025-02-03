export interface ITagParams {
    name: string;
    slug?: string;
}

export interface ITags {
    tags: ITagParams[];
}

export interface ITagProps extends ITagParams, ITags {
    error: string;
    success: boolean;
    deleted: boolean;
    reload: boolean;
}

export interface ITag {
    _id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date
}