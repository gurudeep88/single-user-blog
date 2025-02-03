'use client';
import { POST_SERVER } from '@/api/httpServer';
import { API_DEVELOPMENT_SERVICE } from '@/config';
import { ISingleBlog } from '@/interface/blog';
import React, { useEffect, useState } from 'react'
import SmallCard from '../SmallCard';

const RelatedBlog = ({blog}: {blog: ISingleBlog}) => {
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        const loadRelatedBlogs = async() => {
            const related = await POST_SERVER({
                url: `${API_DEVELOPMENT_SERVICE}/blogs/related`, 
                payload: {_id: blog._id, categories: blog.categories}
            });
            if(related){
                setRelatedBlogs(related);
            }
        }
        loadRelatedBlogs();
    },[])

    const showRelatedBlogs = () => {
        if(!relatedBlogs?.length){
            return null;
        }
        return relatedBlogs.map((related, i)=>(
            <div className='col-md-4' key={i}>
                <article>
                    <SmallCard blog={related} />
                </article>
            </div>
        ))
    }
    console.log('rela', relatedBlogs)
  return (
    <div className='row'>
        {showRelatedBlogs()}
    </div>
  )
}

export default RelatedBlog