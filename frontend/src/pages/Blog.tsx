import { BlogCard } from "../compnents/BlogCard";
import { AllBlogSkelton } from "../compnents/AllBlogSkelton";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";

export function Blog(){
    const { loading, blogs, loggedIn } = useBlogs();
    const navigate = useNavigate();
    if(!loggedIn){
        navigate('/signin')
    }
    if(loading){
        return <AllBlogSkelton/>   
    }

    return(
        <div className="max-w-screen min-h-screen  flex flex-col gap-3 items-center">
            <div className="flex flex-col gap-2 w-full max-w-4xl max-h-none min-h-fit py-3 cursor-pointer">
                {blogs.map((blog, index) => (
                    <BlogCard 
                        key={index}
                        id={blog.id}
                        name={blog.author.name} 
                        date={blog.createdAt} 
                        title={blog.title} 
                        content={blog.content}
                        postPhoto= {blog.photoUrl} 
                        genre={blog.genre} 
                    />
                ))}   
                           
            </div>
            
        </div>
    )
}