import CreateBlog from '@/components/crud/CreateBlog'
import PrivateAdmin from '@/components/PrivateAdmin'
import React from 'react'

const Blog = () => {
  return (
    <div>
        <PrivateAdmin>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 pt-5 pb-5">
                  <h2>Create a new blog</h2>
                </div>
                <div className="col-md-12">
                    <CreateBlog />
                </div>
              </div>
            </div>
        </PrivateAdmin>
    </div>
  )
}

export default Blog