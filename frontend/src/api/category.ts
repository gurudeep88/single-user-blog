import { API_DEVELOPMENT_SERVICE } from "@/config";
import { DELETE, GET, POST } from "./http";
import { ICategoryProps } from "@/interface/category";

export const createCategory = async(payload: ICategoryProps) => {
    const url = `${API_DEVELOPMENT_SERVICE}/category`;
    return await POST({ url, payload });
}

export const listCategories = async() => {
    const url = `${API_DEVELOPMENT_SERVICE}/categories`;
    return await GET({ url });
}

export const readCategory = async(slug: string) => {
    const url = `${API_DEVELOPMENT_SERVICE}/category/${slug}`;
    return await GET({ url });
}

export const deleteCategory = async(slug: string) => {
    const url = `${API_DEVELOPMENT_SERVICE}/category/${slug}`;
    return await DELETE({ url });
}
