'use client';
import './index.css';
import { getLocalStorage } from '@/api/auth';
import { createBlog } from '@/api/blog';
import { listCategories } from '@/api/category';
import { listTags } from '@/api/tag';
import ReactQuillEditor from '@/components/ReactQuillEditor';
import { initialBlog } from '@/state/blog';
import { parseHTMLTextContent } from '@/utils';
import React, { useEffect, useState } from 'react'

const CreateBlog = () => {
    const getBlogFromLocalStorage = () => {
        if(typeof window !== "undefined")
        return getLocalStorage('multi-user-blog-body')
    }
    const [body, setBody] = useState<string | null>(getBlogFromLocalStorage());
    const [state, setState] = useState(initialBlog);
    const [ features, setFeatures ] = useState<{
        categories: {_id: string; name: string}[], tags: {_id: string; name: string}[]}
    >({
        categories: [],
        tags: []
    });

    const [checked, setChecked] = useState<{categories: string[], tags: string[]}>({
        categories: [],
        tags: []
    });

    const {error, sizeError, success, formData, title, hidePublishButton } = state;


    useEffect(() => {
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

        loadCategories();
        loadTags()

        if(body){
            formData.set('body', body);
        }

    },[])
    
    const publishBlog = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let error = '';
        if(!title){
            error = 'Title is required'
        }else if(!body){
            error = 'body content is required'
        }else if(!formData.get('photo')){
            error = 'Image is required'
        }else if(!checked.categories?.length){
            error = 'please select at least one category'
        }else if(!checked.tags?.length){
            error = 'please select at least one tag'
        }
        if(error){
            return setState({...state, error})
        }

        const response = await createBlog(formData);
        if(response?.error){
            setState({...state, error: response.error})
        }else{
            localStorage.removeItem('multi-user-blog-body');
            formData.delete('title');
            formData.delete('body');
            formData.delete('photo');
            formData.delete('categories');
            formData.delete('tags');
            setState({ ...state, title: '', error: '', success: `A new blog titled ${state.title} is created` });
            setBody(null);
            setChecked(prev => ({...prev, categories: [], tags: []}));
        }
    }

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
    
    const handleBody = (e: any) => {
        if(!parseHTMLTextContent(e)){
            if(typeof window !== "undefined"){
                localStorage.removeItem('multi-user-blog-body');
            }
            return;
        }
        setBody(e);
        formData.set('body', body ? body : e);
        localStorage.setItem('multi-user-blog-body', JSON.stringify(e));
    }
    
    const showAlert= () => {
        if(error){
            return (<div className="alert alert-danger" style={{display: error ? '' : 'none' }} >{error}</div>)
        }else if(success){
            return (<div className="alert alert-success" style={{display: success ? '' : 'none' }} >{success}</div>)
        }
        return;
    }
    
    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
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
                        value={body} 
                        placeholder='Type here...' 
                        onChange={handleBody}
                    />
                </div>
                <div className='mt-2'>
                    <button type='submit'  className="btn btn-primary mb-2">Publish</button>
                </div>
            </form>
        )
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

    const showCategories = () => {
        return (
            features.categories?.length ? features.categories.map((c: {_id: string; name: string}, i) => (
                <li className="list-unstyled" key={i}>
                    <input type="checkbox" checked={checked.categories?.includes(c._id)} className='me-2' name='category' onChange={handleCheckbox('category', c._id)} />
                    <label key={c._id}  className='form-check-label'>{c.name}</label>
                </li>
            )) : <></>
        )
    }

    const showTags = () => {
        return (
            features.tags?.length ? features.tags.map((t: {_id: string; name: string}, i) => (
                <li className="list-unstyled" key={i}>
                    <input type="checkbox" checked={checked.tags?.includes(t._id)} className='me-2' name='tag' onChange={handleCheckbox('tag', t._id)}  />
                    <label key={t._id}  className='form-check-label'>{t.name}</label>
                </li>
            )) : <></>
        )
    }
  return (
    <div className='container-fluid '>
        <div className="row">
            <div className="col-md-8">
                {createBlogForm()}
                {showAlert()}
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

export default CreateBlog