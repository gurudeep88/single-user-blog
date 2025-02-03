import { IBlogWithCategoryTags, ISingleBlog } from "@/interface/blog"
import { API_DEVELOPMENT_SERVICE } from "."
import moment from "moment"

export const blogPhotoUrl = (blog: IBlogWithCategoryTags | ISingleBlog) => {
    return `${API_DEVELOPMENT_SERVICE}/blog/photo/${blog.slug}`
}

export const blogWrittenPublishedBy = (blog:IBlogWithCategoryTags | ISingleBlog) => {
    return `Written by ${blog.postedBy.name} | Published ${moment(blog.updatedAt).fromNow()}`;
}