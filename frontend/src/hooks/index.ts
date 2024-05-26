import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from '../config'

interface Blogs {
    id: number;
    title: string;
    content: string;
    genre: string;
    createdAt: string
    photoUrl: string
    author: {
        name: string
    }
}

export const useBlog = ({ id }: { id: number }) => {

    const [ loading, setLoading ] = useState(true);
    const [ blog, setBlog ] = useState<Blogs>();

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/post/${id}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then( res => {
                setBlog(res.data.blog)
                setLoading(false)
            });
    }, [id]);

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {

    const [ loading, setLoading ] = useState(true);
    const [ blogs, setBlogs ] = useState<Blogs[]>([]);

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then( res => {
                setBlogs(res.data.allBlog)
                setLoading(false)
            });
    }, []);

    return {
        loading,
        blogs
    }
}