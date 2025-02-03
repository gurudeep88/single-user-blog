import { API_DEVELOPMENT_SERVICE } from "@/config"
import { DELETE, GET, POST } from "./http";
import { ITagParams } from "@/interface/tag";

export const createTag = async(payload: ITagParams) => {
    const url = API_DEVELOPMENT_SERVICE + '/tag';
    return await POST({url, payload});
}

export const listTags = async() => {
    const url = API_DEVELOPMENT_SERVICE + '/tags';
    return await GET({url});
}

export const readTag = async(slug: string) => {
    const url = API_DEVELOPMENT_SERVICE + '/tag/' + slug;
    return await GET({url});
}

export const deleteTag = async(slug: string) => {
    const url = `${API_DEVELOPMENT_SERVICE}/tag/${slug}`;
    return await DELETE({url});
}