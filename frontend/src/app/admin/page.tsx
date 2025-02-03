'use client';
import PrivateAdmin from '@/components/PrivateAdmin';
import Link from 'next/link';
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
        <PrivateAdmin>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 pt-5 pb-5">
                  <h2>Admin Dashboard</h2>
                </div>
                <div className="col-md-4">
                <ul className="list-group">
                  {linkData.map(item => (
                    <li className="list-group-item" aria-current="true" key={item.id}>
                      <Link href={item.href} className='text-primary'>{item.title}</Link>
                    </li>
                  ))}
                </ul>
                </div>
                <div className="col-md-8">
                  Right
                </div>
              </div>
            </div>
        </PrivateAdmin>
    </div>
  )
}

export default AdminDashboard

const linkData = [
  {
    id: 1,
    title: 'Create Category',
    href: '/admin/category-tag'
  },
  {
    id: 2,
    title: 'Create Tag',
    href: '/admin/category-tag'
  },
  {
    id: 3,
    title: 'Create Blog',
    href: '/admin/blog'
  },
  {
    id: 4,
    title: 'Update/ Delete Blog',
    href: '/admin/blogs'
  }
]