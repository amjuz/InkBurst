import moment from "moment-timezone";
import { Link } from "react-router-dom";


interface BlogCardType {
    id: number;
    name: string;
    date: string;
    title:string;
    content: string;
    postPhoto?: string;
    genre: string;
}

export function BlogCard({
    id,
    name,
    date,
    title,
    content,
    genre,
    
}: BlogCardType ) {
    
    return(
        <Link to={`/blog/${id}`}>
            <div className="mb-4 rounded-2xl max-w-fit min-w-full  hover:cursor-pointer px-3 ">
                <div className="flex flex-col border-b pb-4 gap-1 ">
                    <div className="flex items-center gap-2">
                        <div className="">
                            <Avatar/>
                        </div>
                        <div className=" font-medium">{name} .</div>
                        <div className="">{moment(date).format('DD-MM-YY')}</div>
                    </div>
                    <div className="flex  justify-between min-h-8 max-h-28 gap-5">
                        <div className="flex flex-col ">
                            <div className="font-bold text-2xl overflow-hidden">{title.slice(0, 50 ) + "..."}</div>
                            <div className="font-serif overflow-hidden">{content.slice(0, 330) + "..." }</div>
                        </div>
                        {/* <div className="bg-slate-300 min-w-32 max-h-28 border-4 invisible border-slate-400 mr-4 rounded-xl hidden sm:block">
                            {postPhoto}
                        </div> */}
                    </div>
                    <div className="flex gap-2 ">
                        <div className="text-white text-xs  bg-gray-500 px-2 grid place-content-center rounded-xl">{genre}</div>
                        <div className="font-serif text-xs ">{`${Math.floor(content.length/238  )} min read`}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
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