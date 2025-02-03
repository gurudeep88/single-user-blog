import { POST_SERVER } from '@/api/httpServer';
import { API_DEVELOPMENT_SERVICE, APP_DOMAIN, BASE_DESCRIPTION, BASE_TITLE, OG_TITLE } from '@/config';
import React from 'react'
import { IBlogWithCategoryTags, IResponseBlogCategoryTag } from '@/interface/blog';
import Card from '@/components/blog/Card';
import LoadMore from '@/components/LoadMore';
import TagCategory from '@/components/TagCategory';
import { generateUniqueMetadata } from '@/helpers/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const pathname = `/blogs`;
  
    return generateUniqueMetadata({
      title: BASE_TITLE,
      description: BASE_DESCRIPTION,
      ogTitle: OG_TITLE, 
      canonicalBaseUrl: `${APP_DOMAIN}}`, 
      ogBaseUrl: `${APP_DOMAIN}`, 
      ogImage: `${APP_DOMAIN}/static/images/seo.jpg`, 
      pathname
    });
  }

const Blogs = async() => {
    const limit = 2;
    const skip = 0;
    let size = 0;
    const response: IResponseBlogCategoryTag = await POST_SERVER({
        url: `${API_DEVELOPMENT_SERVICE}/blogs-categories-tags`, 
        payload: {skip: 0, limit: 2}
    });

    size = response.size;

    const showBlogs = () => {
        return response?.blogs?.length ? response.blogs.map((blog: IBlogWithCategoryTags, index: number) => {
            return (
                <article key={index}>
                    <Card blog={blog} />
                    <hr />
                </article>
            )
        }) : null
    }

  return (
    <React.Fragment>
    <main>
        <div className="container-fluid">
            <header>
                <div className="col-md-12 pt-3">
                    <h1 className="display-4 font-weight-bold text-center">
                        Programming Blogs and Tutorials
                    </h1>
                </div>
                <section>
                    <div className='mb-3 text-center'>
                        <TagCategory 
                            categories={response.categories}
                            tags={response.tags}
                        />
                    </div>
                </section>
            </header>
        </div>
        <div className="container-fluid">
                        {showBlogs()}
        </div>
        <LoadMore 
            size={size} 
            skip={skip} 
            limit={limit} 
        />
    </main>
    </React.Fragment>
  )
}

export default Blogs