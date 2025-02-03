import { API_DEVELOPMENT_SERVICE } from "@/config";
import { DELETE_SERVER, GET_SERVER, UPDATE_SERVER } from "./httpServer";

export const listBlogs = async() => {
    const url = `${API_DEVELOPMENT_SERVICE}/blogs`;
    return await GET_SERVER({ url });
}

export const deleteBlogs = async(slug: string) => {
    const url = `${API_DEVELOPMENT_SERVICE}/blog/${slug}`;
    return await DELETE_SERVER({ url });
}

export const updateBlogs = async(slug: string, payload: FormData) => {
    const url = `${API_DEVELOPMENT_SERVICE}/blog/${slug}`;
    return await UPDATE_SERVER({ url, payload, isForm: true});
}