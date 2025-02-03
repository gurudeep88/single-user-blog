
import { APIResponseProps } from './api';
export interface ICategoryProps {
    name: string;
    slug?: string;
}

export interface Categories {
    categories: Array<ICategoryProps>;
}

export interface CategoryProps extends ICategoryProps, Categories, APIResponseProps {
    deleted: boolean;
    reload?: boolean;
}

export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date
}