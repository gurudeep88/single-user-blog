import UpdateBlog from '@/components/crud/UpdateBlog'
import PrivateAdmin from '@/components/PrivateAdmin'
import React from 'react'

const Blog = () => {
  return (
    <div>
        <PrivateAdmin>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 pt-5 pb-5">
                  <h2>Update blog</h2>
                </div>
                <div className="col-md-12">
                    <UpdateBlog />
                </div>
              </div>
            </div>
        </PrivateAdmin>
    </div>
  )
}

export default Blog