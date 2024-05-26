import { BlogCard } from "../compnents/BlogCard";
import { useBlogs } from "../hooks";

export function Blog(){
    const { loading, blogs } = useBlogs();

    if(loading){
        return <div>
            loading...
        </div>
    }

    
    return(
        <div className="max-w-screen min-h-screen  flex flex-col gap-3 items-center">
            <div className="flex flex-col gap-2 w-full  max-w-6xl max-h-none min-h-fit py-3 cursor-pointer">
                {blogs.map(blog => (
                    <BlogCard 
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