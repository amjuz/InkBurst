import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from '../config'

interface Blogs {
    id: number;
    title: string;
    content: string;
    genre: string;
    createdAt: string;
    photoUrl: string;
    author: {
        name: string;
    };
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
    const [ loggedIn, setLoggedIn ] = useState(true);

    useEffect(()=> {
        const token = localStorage.getItem('token')

        if(!token){
            setLoggedIn(false)
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                authorization: token
            }
        })
        .then( res => {
            if(res.status === 200){
                setBlogs(res.data.allBlog)
                setLoading(false)
            }
            else {
                setLoggedIn(false)
            }
        })
        .catch( error => {
            if( error.response ){
                switch( error.response.status ) {
                    case 401: 
                    case 403:
                    case 411:
                        setLoggedIn(false);
                        break;
                }
            }
                
        })
    }, []);

    return {
        loggedIn,
        loading,
        blogs
    }
}

export const useAuthnetication = () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/auth`,{
            headers: {
                Authorization: token
            }
        })
        .then( res => {
            if(res.status === 200){
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        })
        .catch( error => {
            console.log(error)
        })
    },[])
    return {
        loggedIn
    }
}

export const useAuth = () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    
    useEffect(()=>{
        const token = localStorage.getItem('token')

        axios.get(`${BACKEND_URL}/api/v1/blog/auth`,{
            headers: {
                Authorization: token
            }
        })
        .then( res => {
            if( res.status === 200 ){
                setLoggedIn(true)
            } 
        })
        .catch(e => {
            console.log(e)
        })
    },[])

    return { loggedIn }
}