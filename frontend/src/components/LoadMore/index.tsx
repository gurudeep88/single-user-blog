"use client";
import { IBlogWithCategoryTags, IResponseBlogCategoryTag } from "@/interface/blog";
import React, { useState } from "react";
import Card from "../blog/Card";
import { API_DEVELOPMENT_SERVICE } from "@/config";

const LoadMore = ({ size: initialSize, skip: initialSkip, limit }: { size: number; skip: number; limit: number }) => {
    const [loadedBlogs, setLoadedBlogs] = useState<IBlogWithCategoryTags[]>([]);
    const [size, setSize] = useState(initialSize);
    const [skip, setSkip] = useState(initialSkip);
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        setLoading(true);
        const skipTo = skip + limit;
        const payload = {skip: skipTo, limit};
        const url = `${API_DEVELOPMENT_SERVICE}/blogs-categories-tags`;
        const authHeaders = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        };
        fetch(url, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(payload) 
        })
        .then( data => data.json())
        .then((list: IResponseBlogCategoryTag) => {
            if (list && list.blogs.length > 0) {
                setLoadedBlogs(prev => [...prev, ...list.blogs]);
                setSize(list.size);
                setSkip(prevSkip => prevSkip + limit);
            } else {
                console.warn("No more blogs to load.");
            }
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
        })
        .finally(() => setLoading(false));
    };
    
    return (
        <>
            <div className="container-fluid">
                {loadedBlogs.length > 0 ? (
                    loadedBlogs.map((blog, index) => (
                        <article key={blog._id || index}>
                            <Card blog={blog} />
                            <hr />
                        </article>
                    ))
                ) : (
                    null
                )}
            </div>
            <div className="text-center mt-5 mb-5">
                {size > 0 && size >= limit && (
                    <button onClick={loadMore} className="btn btn-primary btn-lg" disabled={loading}>
                        {loading ? "Loading..." : "Load More"}
                    </button>
                )}
            </div>
        </>
    );
};

export default LoadMore;
