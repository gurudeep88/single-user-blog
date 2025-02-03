import { ICategory } from '@/interface/category'
import { ITag } from '@/interface/tag'
import Link from 'next/link'
import React from 'react'

const TagCategory = ({ categories, tags }: {categories: ICategory[], tags: ITag[]}) => {

    const showCategories = () => {
        return categories?.length ? categories.map((c, i: number) => {
            return (
                <Link href={`/categories/${c.slug}`} key={i} className='btn btn-primary me-1 ms-1 mt-3'>{c.name}</Link>
            )
        })
        : null
    }
    const showTags = () => {
        return tags?.length ? tags.map((t, i: number) => {
            return (
                <Link href={`/categories/${t.slug}`} key={i} className='btn btn-outline-primary me-1 ms-1 mt-3'>{t.name}</Link>
            )
        })
        : null
    }

  return (
    <>
        {showCategories()}
        {showTags()}
    </>
  )
}

export default TagCategory