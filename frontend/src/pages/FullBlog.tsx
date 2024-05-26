import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"

export const FullBlog = () => {
    const params = useParams<{ id: string }>(); 
    const id = Number(params.id);
    const { loading, blog } = useBlog({id});

    if(loading){
        return <div>
            loading...
        </div>
    }

    return <div className="flex flex-col items-center bg-slate-300 w-screen h-full">
        <div className="flex  flex-col bg-yellow-300 min-w-96 w-4/6 pt-10 px-8  gap-2">
            <div className="text-5xl font-extrabold overflow-hidden">{blog?.title}</div>
            <div className="flex items-center gap-4 bg-teal-300 py-2 min-w-80">
                <Avatar/>
                <div className="">
                    <div className="">{blog?.author.name} . Follow</div>
                    <div className="">{blog?.createdAt}. date</div>
                </div>
            </div>
            <div>{blog?.content}</div>

        </div>
        
    </div>
}


function Avatar() : JSX.Element {
    return(
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
    
    )
}