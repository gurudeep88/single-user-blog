import { API_DEVELOPMENT_SERVICE } from "@/config";
import { DELETE, GET, POST } from "./http";

export const createBlog = async(payload: FormData) => {
    const url = `${API_DEVELOPMENT_SERVICE}/blog`;
    return await POST({ url, payload , isForm: true});
}

export const listBlogs = async() => {
    const url = `${API_DEVELOPMENT_SERVICE}/blogs`;
    return await GET({ url });
}

export const listBlogsWithCategoriesAndTags = async(skip: number, limit: number) => {
    const payload = {skip, limit};
    const url = `${API_DEVELOPMENT_SERVICE}/blogs-categories-tags`;
    return await POST({ url, payload });
}

export const readBlog = async(slug: string) => {
    const url = `${API_DEVELOPMENT_SERVICE}/blog/${slug}`;
    return await GET({ url });
}

export const deleteBlog = async(slug: string) => {
    const url = `${API_DEVELOPMENT_SERVICE}/blog/${slug}`;
    return await DELETE({ url });
}
