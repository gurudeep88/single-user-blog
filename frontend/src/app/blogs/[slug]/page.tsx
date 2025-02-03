
import parse from 'html-react-parser';
import { GET_SERVER } from '@/api/httpServer';
import TagCategory from '@/components/TagCategory';
import { API_DEVELOPMENT_SERVICE, APP_DOMAIN } from '@/config';
import { blogPhotoUrl, blogWrittenPublishedBy } from '@/config/blog';
import { ISingleBlog } from '@/interface/blog';
import { Metadata } from 'next';
import { generateUniqueMetadata } from '@/helpers/seo';
import RelatedBlog from '@/components/blog/RelatedBlog';


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = encodeURIComponent((await params)?.slug);
  const API_URL = `${API_DEVELOPMENT_SERVICE}/blog/${slug}`;
  const pathname = `/blog/${slug}`;
  const blog: ISingleBlog = await GET_SERVER({ url: API_URL });

  return generateUniqueMetadata({
    title: blog.title,
    description: blog.metaDescription,
    ogTitle: blog.title, 
    canonicalBaseUrl: `${APP_DOMAIN}/blog/${blog.slug}`, 
    ogBaseUrl: `${APP_DOMAIN}/blog/${blog.slug}`, 
    ogImage: `${APP_DOMAIN}/api/blog/photo/${blog.slug}`, 
    pathname
  });
}

const Blog = async({params}: {params: {slug: string}}) => {
  const { slug } = await params;
  const API_URL = `${API_DEVELOPMENT_SERVICE}/blog/${encodeURIComponent(slug)}`;
  const blog: ISingleBlog = await GET_SERVER({url: API_URL});
  const photoUrl = blogPhotoUrl(blog);

  return (
      <main>
          <article>
              <div className="container-fluid">
                <section>
                  <div className='row' style={{marginTop: '-30px'}}>
                    <img src={photoUrl} alt={blog.title} className='img img-fluid featured-image' />
                  </div>
                </section>
                <section>
                  <div className="container">
                    <h1 className="display-2 pb-3 pt-3 text-center font-weigt-bold">{blog.title}</h1>
                    <p className='lead mt-3 mark'>
                      {blogWrittenPublishedBy(blog)}
                    </p>
                    <div className="pb-3">
                      <TagCategory
                        categories={blog.categories}
                        tags={blog.tags}
                      />
                    </div>
                  </div>
                </section>
              </div>
              <div className="container">
                <section>
                  <div className="col-md-12 lead">
                    {parse(`${(blog.body)}`) || ''}
                  </div>
                </section>
              </div>

              <div className="container pb-5">
                <h4 className='text-center pt-5 pb-5 h2'>Related Blogs</h4>
                <hr />
                <RelatedBlog blog={blog} />
              </div>

              <div className="container pb-5">
                <p>show comments</p>
              </div>
          </article>
      </main>
  )
}

export default Blog;