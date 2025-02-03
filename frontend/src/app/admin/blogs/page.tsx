import ReadBlogs from '@/components/crud/ReadBlogs'
import PrivateAdmin from '@/components/PrivateAdmin'
import React from 'react'

const Blogs = () => {
  return (
    <div>
        <PrivateAdmin>
            <div className="container">
              <div className="row">
                <div className="col-md-12 pt-5 pb-5">
                  <h2>Manage blogs</h2>
                </div>
                <div className="col-md-12">
                    <ReadBlogs />
                </div>
              </div>
            </div>
        </PrivateAdmin>
    </div>
  )
}

export default Blogs