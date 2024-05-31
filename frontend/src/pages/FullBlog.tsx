import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { OneBlogSkelton } from "../compnents/OneBlogSkelton";
import moment from "moment-timezone";


export const FullBlog = () => {
    const params = useParams<{ id: string }>(); 
    const id = Number(params.id);
    const { loading, blog } = useBlog({id});

    if(loading){
        return <div>
            <OneBlogSkelton/>
        </div>
    }

    return <div className="flex flex-col items-center  w-screen h-full">
        <div className="flex flex-col  min-w-96 w-2/5 pt-10 px-8  gap-2">
            <div className="text-5xl font-extrabold py-2 overflow-hidden ">{blog?.title}</div>
            <div className="flex items-center gap-4  py-2 min-w-80">
                <Avatar/>
                <div className="">
                    <div className="">{blog?.author.name} </div>
                    <div className="">{moment(blog?.createdAt).format('DD-MM-YY')} . {`${Math.floor((blog?.content as string).length/238  )} min read`}</div>
                </div>
            </div>
            <div className="leading-8 font-bitter ">
                {blog?.content}
            </div>
        </div>
        
    </div>
}


function Avatar() : JSX.Element {
    return(
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg 
                className="absolute w-12 h-12 text-gray-400 -left-1" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                >
                </path>
            </svg>
        </div>
    
    )
}