'use client';
import { readBlog } from '@/api/blog';
import { listCategories } from '@/api/category';
import { updateBlogs } from '@/api/serverBlog';
import { listTags } from '@/api/tag';
import ReactQuillEditor from '@/components/ReactQuillEditor';
import { isAdmin } from '@/config/admin';
import { blogPhotoUrl } from '@/config/blog';
import { isUser } from '@/config/user';
import { ISingleBlog } from '@/interface/blog';
import { initialUpdateBlog } from '@/state/blog';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'

const UpdateBlog = () => {
  const [blog, setBlog] = useState<ISingleBlog>();
  const [state, setState] = useState(initialUpdateBlog);
  const [editorBody, setEditorBody] = useState<string>();
  const [ features, setFeatures ] = useState<{
        categories: {_id: string; name: string}[], tags: {_id: string; name: string}[]
  }>({
        categories: [],
        tags: []
  });
  const [checked, setChecked] = useState<{categories: string[], tags: string[]}>({
        categories: [],
        tags: []
  });
  const router = useRouter();
  const params = useParams<{slug: string}>();
  const {slug} =  params;
  

  const {error, sizeError, success, formData, title } = state;

  const initBlog = async() => {
    if(!slug){
        return;
    }
    try {
        const singleBlog: ISingleBlog = await readBlog(slug as string);
        console.log('singleblog', singleBlog)
        setBlog(singleBlog);
        setState({...state, title: singleBlog.title})
        setEditorBody(singleBlog.body);
        setCheckedArray(singleBlog)
    } catch (error: any) {
        console.log('error in fetching single blog', error.message)
    }
  }

  const setCheckedArray = (singleBlog: ISingleBlog) => {
    const categories: string[] = [];
    const tags: string[] = [];
    if(singleBlog.categories?.length){
        singleBlog.categories?.map((c) => {
            categories.push(c._id);
        })
    } 
    if(singleBlog.tags?.length){
        singleBlog.tags?.map((t) => {
            tags.push(t._id);
        })
    } 
    setChecked({
        ...checked, 
        categories, 
        tags
    })
  }

  const loadCategories = async() => {
    const response = await listCategories();
    if(response?.error){
        setState({...state, error: response?.error});
    }else{
        setFeatures(prev => ({...prev, categories: response}));
    }
    }
    const loadTags= async() => {
        const response = await listTags();
        if(response?.error){
            setState({...state, error: response?.error});
        }else{
            setFeatures(prev => ({...prev, tags: response}));
        }
    }

  useEffect(() => {
    loadCategories();
    loadTags()
    initBlog();
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value;
          const { name } = e.target;
          if(name === 'photo'){
              if(e.target.files){
                  value = e.target.files[0];
              }else{ return ;}
          }else{
              value = e.target.value;
          }
          formData.set(name, value);
          setState({...state, [name]: value, formData, error: ''})
      }

  const handleEditorBody = (e: any) => {
    setEditorBody(e);
    formData.set('body', e);
  }

  const showAlert= () => {
    if(error){
        return (<div className="alert alert-danger" style={{display: error ? '' : 'none' }} >{error}</div>)
    }else if(success){
        return (<div className="alert alert-success" style={{display: success ? '' : 'none' }} >{success}</div>)
    }
    return;
    }

const handleCheckbox = (type: string, _id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const result = {...checked};
        if(type === 'category'){
            if(checked.categories?.indexOf(_id) > -1){    
                const categories = checked.categories.filter(id => id !== _id);
                result.categories = [...categories];
            }else{
                result.categories = [...result.categories, _id];
            }
        }else{
            if(checked.tags?.indexOf(_id) > -1){
                const tags = checked.tags.filter(id => id !== _id);
                result.tags = [...tags];
            }else{
                result.tags = [...result.tags, _id];
            }
        }
        setChecked({...result});
        formData.set('categories', JSON.stringify(result.categories));
        formData.set('tags', JSON.stringify(result.tags));
    }

    const findChecked = (checked: string[], _id: string) => {
        return checked?.includes(_id)
    }

    const showCategories = () => {
        return (
            features.categories?.length ? features.categories.map((c: {_id: string; name: string}, i) => (
                <li className="list-unstyled" key={i}>
                    <input type="checkbox" checked={findChecked(checked.categories, (c._id))} className='me-2' name='category' onChange={handleCheckbox('category', c._id)} />
                    <label key={c._id}  className='form-check-label'>{c.name}</label>
                </li>
            )) : <></>
        )
    }

    const showTags = () => {
        return (
            features.tags?.length ? features.tags.map((t: {_id: string; name: string}, i) => (
                <li className="list-unstyled" key={i}>
                    <input type="checkbox" checked={findChecked(checked.tags, t._id)} className='me-2' name='tag' onChange={handleCheckbox('tag', t._id)}  />
                    <label key={t._id}  className='form-check-label'>{t.name}</label>
                </li>
            )) : <></>
        )
    }


    const editBlog = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('edit')
        try {
            const updatedBlog = await updateBlogs(slug, formData);
            console.log('updated', updatedBlog);
            setState({...state, success: `Blog titled "${updatedBlog?.title}" is successfully updated`});
            console.log('isUser', isUser(), isAdmin());
            if(isUser()){
               // router.replace(`/user/${slug}`)
                router.replace(`/user`)
            }else if(isAdmin()){
              //  router.replace(`/blogs/${slug}`)
              router.replace(`/admin`)
            }
        } catch (error: any) {
            setState({...state, error: error.message})
        }
    
        console.log('up')
      }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group mb-2">
                    <label className='text-muted'>Title</label>
                    <input 
                        type="text"
                        name='title'
                        value={title}
                        required
                        onChange={handleChange} 
                        className='form-control' 
                    />
                </div>
                <div className="form-group">
                    <ReactQuillEditor
                        value={editorBody} 
                        placeholder='Type here...' 
                        onChange={handleEditorBody}
                    />
                </div>
                <div className='mt-2'>
                    <button type='submit'  className="btn btn-primary mb-2">Update</button>
                </div>
            </form>
        )
    }

  
  return (
    
    <div className='container-fluid '>
        <div className="row">
            <div className="col-md-8">
                {updateBlogForm()}
                {showAlert()}
            {blog && editorBody ? 
            <Image src={blogPhotoUrl(blog)} alt={title} className='img-fluid' style={{width: '100%'}} width={100} height={100}/>
                : null }
            </div>
            <div className="col-md-4">
                <div>
                    <div className="form-group pb-2">
                        <h5>Featured Image</h5>
                        <hr />
                        <small className='text-muted'>Max size: 1mb</small>
                        <br />
                        <label className="btn btn-outline-info">Upload featured image
                            <input type="file" accept='image/*' name='photo' onChange={ handleChange } hidden />
                        </label>
                    </div>
                </div>
                <div>
                    <h5>Categories</h5>
                    <hr />
                    <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showCategories()}</ul>
                </div>
                <div >
                    <h5>Tags</h5>
                    <hr />
                    <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showTags()}</ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateBlog