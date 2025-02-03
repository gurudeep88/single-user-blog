'use client'
import { deleteBlogs, listBlogs } from '@/api/serverBlog';
import { blogWrittenPublishedBy } from '@/config/blog';
import { IBlogWithCategoryTags } from '@/interface/blog';
import React, { useEffect, useState } from 'react'
import { deleteBlog } from '../../../api/blog';
import { isAuth } from '@/api/auth';
import { ROLE } from '@/constant';
import Link from 'next/link';
import { isUser } from '@/config/user';
import { isAdmin } from '@/config/admin';

const ReadBlogs = () => {
    const [blogs, setBlogs] = useState<IBlogWithCategoryTags[]>([]);
    const [message, setMessage] = useState('');
    

    const loadBlogs = async() => {
        const loadedBlogs = await listBlogs();
        if(loadedBlogs){
          setBlogs(loadedBlogs);
        }  else{
          console.log('error in loading blogs');
        }
      }

    useEffect(() => {
        loadBlogs();
    },[])

    const deleteConfirm = async(slug: string) => {
        const answer = window.confirm("Are you sure you want to delete the blog?")
        if(answer){
            try {
                const deletedBlog = await deleteBlogs(slug);
                setMessage(deletedBlog.message);
                loadBlogs();
            } catch (error: any) {
                    console.log('error in deleting blog', error.message)
            }
        }
    }

    const showUpdateButton = (blog: IBlogWithCategoryTags) => {
        if(isUser()){
            return <Link href={`/user/${blog.slug}`} className='btn btn-sm btn-warning'>Update</Link>
        }else if(isAdmin()){
            return <Link href={`/admin/${blog.slug}`} className='btn btn-sm btn-warning'>Update</Link>
        }
    }

    const showBlogs = () => {
        return blogs?.length ? blogs?.map((blog, i) => {
            return (
                <div key={i} className='pb-5'>
                    <h3>{blog.title}</h3>
                    <p className="mark">{blogWrittenPublishedBy(blog)}</p>
                    <button onClick={() => deleteConfirm(blog.slug)} className="btn btn-sm btn-danger me-2">Delete</button>
                    {showUpdateButton(blog)}
                </div>
            )
        })  :  null
    }
  return (
    <>
            <div className="row">
                {message ? (
                    <div className="alert alert-warning">{message}</div>
                ) : null }
                {showBlogs()}
            </div>
    </>
  )
}

export default ReadBlogs