'use client';
import { createTag, deleteTag, listTags } from '@/api/tag';
import { ITagParams, ITagProps } from '@/interface/tag';
import { initialTag } from '@/state/tag';
import React, { useEffect, useState } from 'react'

const Tag = () => {
  const [state, setState] = useState<ITagProps>(initialTag);
  const { name, error, success, tags, deleted, reload } = state;
  const [index, setIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<React.ReactElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
        ...prev, 
        [e.target.name]: e.target.value, 
        error: '', 
        success: false,
        deleted: false
    }));
  }
    useEffect(() => {
        const loadTags = async() => {
            try {
               const tags = await listTags();
               setState({ ...state, tags });
            } catch (error: any) {
               setState({ ...state, error })
            }
          }
          loadTags();
    },[success])
  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await createTag({name});
        if(response?.error){
            throw new Error(response.error)
        }
        setState(prev => ({
            ...prev,
            name: '',
            tags: [...state.tags, response],
            success: true,
            error: '',
            reload: !state.reload
        }));
    } catch (error: any) {
        setState({...state, error, success: false});
    }
  }

  const renderForm = () => {
    return (
        <form className='form-group' onSubmit={handleSubmit}>
            <input 
                type="text"
                name='name'
                value={name}
                placeholder='Enter Tag' 
                onChange={handleChange}
                className='form-control'
            />
            <button type='submit' className="btn btn-primary mt-2">Create Tag</button>
        </form>
    )
  }

  const handleDelete = async(e: React.MouseEvent<HTMLSpanElement>, slug: string) => {
    e.preventDefault();
    const answer = window.confirm('Are you sure want to delete this category?');
    if(answer){
        try {
            const response = await deleteTag(slug);
            if(response?.message){
                setState({
                    ...state, 
                    tags: [...state.tags.filter(tag => tag.slug !== slug)],
                    success: true,
                    reload: !state.reload,
                    error: '',
                    deleted: true
                })
            }else{
                throw new Error(response.error);
            }
        } catch (error: any) {
            setState({
                ...state,
                error,
                success: false
            })
        }
        
    }
  }

  const handleShow = (i: number) => {
    setIndex(i);
  }
  const handleHide = () => {
    setIndex(null);
  }

  const showToast = () => {
    if(success && !deleted){
        return <p className='text-success'>Tag is created</p>
    }
    if(error){
        return <p className='text-danger'>Tag already exists</p>
    }
    if(deleted){
        return <p className='text-danger'>Tag is deleted</p>
    }
    return;
  }

  const showTags = () => {
    return tags?.length ? tags.map((tag: ITagParams, i: number) => (
                <button 
                    onMouseEnter={() => handleShow(i)}
                    onMouseLeave={handleHide}
                    className='btn btn-outline-primary me-1 ms-1 mt-3 position-relative' 
                    key={i}
                >
                    <span>{tag.name}</span>
                    <span
                        onClick={(e) => {handleDelete(e, tag.slug!)}}
                        style={{
                            position: 'absolute',
                            top: '-16px',
                            right: '-12px',
                            background: 'aliceblue',
                            borderRadius: '50%',
                            width: '24px',
                            display: index === i ? 'block' : 'none',
                            color: 'blue'
                        }}
                    >
                        x
                    </span>
                </button>
            )) : null
  }


    useEffect(() => {
        setToast(showToast()!);
        const timer = setTimeout(() => {
            setToast(null);
        }, 3000);

        // Cleanup the timer on component unmount or when dependencies change
        return () => clearTimeout(timer);
    },[success, deleted, error])

  return (
    <div style={{width: '80%'}}>
        {toast}
        <h5 className='mb-4'><b>Tag</b></h5>
        {renderForm()}
        {showTags()}
    </div>
  )
}

export default Tag