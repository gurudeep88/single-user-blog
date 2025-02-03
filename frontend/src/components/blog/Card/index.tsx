import React from 'react'
import { IBlogWithCategoryTags } from '@/interface/blog';
import Link from 'next/link';
import parse from 'html-react-parser';
import { blogPhotoUrl, blogWrittenPublishedBy } from '@/config/blog';
import Image from 'next/image';

const Card = ({blog}: {blog: IBlogWithCategoryTags}) => {
  const photoUrl = blogPhotoUrl(blog);
  const showBlogCategories = () => {
    return blog.categories?.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`} className='btn btn-primary me-1 ms-1 mt-3'>{c.name}</Link>
    )) 
  }

  const showBlogTags = () => {
    return blog.tags?.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`} className='btn btn-outline-primary me-1 ms-1 mt-3'>{t.name}</Link>
    )) 
  }

  return (
    <div className="lead pb-4">
        <header>
            <Link href={`/blogs/${blog.slug}`}>
                <h2 className='pb-3 pt-3 font-weight-bold text-info'>{blog.title}</h2>
            </Link>
        </header>
        <section>
            <p className="mark me-1 pt-2 pb-2">{blogWrittenPublishedBy(blog)}</p>
        </section>
        <section>
            {showBlogCategories()}
            {showBlogTags()}
            <br /><br/>
        </section>
        <div className="row">
            <div className="col-md-4">
                <section>
                  <Image src={photoUrl} alt={blog.title} className='img-fluid' style={{maxHeight: 'auto', width: '100%'}} width={100} height={150}/>
                </section>
            </div>
            <div className="col-md-8">
                <section>
                    <div className='pb-3'>{parse(`${(blog.excerpt)}`) || ''}</div>
                    <Link href={`/blogs/${blog.slug}`} className='btn btn-primary pt-2'>Read more</Link>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Card