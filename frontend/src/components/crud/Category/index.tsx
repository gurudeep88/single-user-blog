'use client';
import { createCategory, deleteCategory, listCategories } from '@/api/category';
import { CategoryProps } from '@/interface/category';
import { initialCategory } from '@/state/category';
import React, { useEffect, useState } from 'react'

const Category = () => {
    const [state, setState] = useState<CategoryProps>(initialCategory);
    const [index, setIndex] = useState<number | null>(null);
    const [toast, setToast] = useState<React.ReactElement | null>(null);
    const { name, error, message, loading, categories, deleted, reload } = state;

    

    useEffect(() => {
        const loadCategories = async() => {
            try {
                const categories = await listCategories();
                setState({...state, categories})
            } catch (error: any) {
                setState({...state, error: error.message})
            }
        }
        loadCategories();
    },[reload])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value, 
            error: '', 
            message: '',
            loading: false, 
            deleted: false
        });
    };
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           const response = await createCategory({name});
           if(response?.error){
                throw new Error(response.error);
           }
            setState({
                ...state, 
                error: '',
                message: 'success',
                name: '',
                categories: [...state.categories, response],
                reload: !state.reload
            })
        } catch (error : any) {
            setState({...state, error, message: ''})
        }   
    }

    const handleShow = (i: number) => {
        setIndex(i);
    }

    const handleHide = () => {
        setIndex(null)
    }

    const showToast = () => {
            if(message && !deleted){
                return <p className='text-success'>Category is created</p>
            }
            if(error){
                return <p className='text-danger'>Category already exists</p>
            }
            if(deleted){
                return <p className='text-danger'>Category is deleted</p>
            }
            return;
    }

    const handleDelete = async(e: React.MouseEvent<HTMLSpanElement>, slug: string) => {
        e.preventDefault();
        const answer = window.confirm('Are you sure want to delete this category?');
        if(answer){
            try {
                const response = await deleteCategory(slug);
                if(response?.message){
                    setState({
                        ...state, 
                        error: '',
                        message: 'success',
                        categories: [...state.categories.filter((cat) => cat.slug !== slug)],
                        reload: !state.reload,
                        deleted: true
                    })
                }else{
                    throw new Error(response.error);
                }
            } catch (error: any) {
                setState({
                    ...state, 
                    error,
                    message: ''
                })
            }
        }
        
    }

    const showCategories = () => {
        return categories.map((category, i) => (
            <button className="btn btn-outline-primary me-1 ms-1 mt-3 position-relative" key={i} onMouseEnter={ () =>handleShow(i)} onMouseLeave={handleHide}>
                    <span>{category.name}</span>
                    <span 
                        onClick={(e) => handleDelete(e, category.slug!)}
                        className='position-absolute' 
                        style={{
                            top: '-16px',
                            right: '-12px',
                            background: 'aliceblue',
                            borderRadius: '50%',
                            width: '24px',
                            display: index === i ? 'block' : 'none',
                            color: 'blue'
                        }}>
                            x
                    </span>
            </button>
        ))
    }

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                    type="text" 
                    name='name' 
                    value={name} 
                    onChange={handleChange} 
                    required 
                    placeholder='Enter Category'
                    className='form-control' 
                />
            </div>
            <div className='mt-2'>
                <button type='submit' className='btn btn-primary'> Create Category</button>
            </div>
        </form>
    )

    useEffect(() => {
        setToast(showToast()!);
        const timer = setTimeout(() => {
            setToast(null);
          }, 3000);
      
          // Cleanup the timer on component unmount or when dependencies change
          return () => clearTimeout(timer);
    },[message, deleted, error])

  return (
    <div style={{width: '80%'}}>
        <h5 className='mb-4'><b>Category</b></h5>
        {toast}
        <div>
            {categoryForm()}
            {showCategories()}
        </div>
    </div>
  )
}

export default Category