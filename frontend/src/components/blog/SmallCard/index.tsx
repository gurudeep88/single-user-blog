import React from 'react'
import { IBlogWithCategoryTags } from '@/interface/blog';
import Link from 'next/link';
import { blogPhotoUrl } from '@/config/blog';
import moment from 'moment';
import parse from 'html-react-parser';
import Image from 'next/image';

const SmallCard = ({blog}: {blog: IBlogWithCategoryTags}) => {  
  const photoUrl = blogPhotoUrl(blog);

  return (
    <div className='card'>
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <Image src={photoUrl} alt={blog.title} className='img-fluid' style={{maxHeight: 'auto', width: '100%'}} width={100} height={150}/>
        </Link>
      </section>
      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <h5 className='card-title text-info'>{blog.title}</h5>
          </Link>
          <div className="card-text">{parse(blog.excerpt)}</div>
        </section>
      </div>
      <div className="card-body" >
          Posted {moment(blog.updatedAt).fromNow()} by <Link href={'/'} className='text-success float-right'>{blog.postedBy.name}</Link>
      </div>
    </div>
  )
}

export default SmallCard