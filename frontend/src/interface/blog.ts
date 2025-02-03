import { ICategory } from "./category";
import { ITag } from "./tag";
import { PostedByUser } from "./user";

export interface IBlog {
    title: string;
    formData: FormData;
}

export interface  IBlogBody {
    body: object;
}

export interface ITagProps extends IBlog,  IBlogBody {
    error: string;
    sizeError: string;
    success: string;
    hidePublishButton: boolean;
}


export interface IDBTag {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string
}

export interface IBlogWithCategoryTags {
    _id: string; 
    title: string; 
    slug: string; 
    excerpt: string; 
    categories: ICategory[]; 
    tags: ITag[]; 
    postedBy: PostedByUser; 
    createdAt: string; 
    updatedAt: string;
}

export interface IResponseBlogCategoryTag {
    blogs: IBlogWithCategoryTags[] 
    categories: ICategory[]; 
    tags: ITag[]; 
    size: number;
    limit: number;
    skip: number;
}

export interface IPhoto {
    data: Buffer;
    contentType: string;
}

export interface ISingleBlog {
    _id: string; 
    title: string; 
    body: string;
    slug: string; 
    metaTitle: string;
    metaDescription: string;
    photo: IPhoto; 
    categories: ICategory[]; 
    tags: ITag[]; 
    postedBy: PostedByUser; 
    createdAt: string; 
    updatedAt: string;
}