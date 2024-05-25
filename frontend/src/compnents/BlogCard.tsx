

interface BlogCardType {
    
    name: string;
    date: string;
    title:string;
    content: string;
    postPhoto: string;
    genre: string;
}

export function BlogCard({
    name,
    date,
    title,
    content,
    postPhoto,
    genre,
    
}: BlogCardType ) {
    
    return(
        <div className="bg-white rounded-2xl max-w-fit min-w-full  hover:bg-stone-100 hover:cursor-pointer px-3 py-3">
            <div className="flex flex-col gap-2 border-b pb-4">
                <div className="flex items-center gap-2">
                    <div className="">
                        <Avatar/>
                    </div>
                    <div className=" font-medium">{name}.</div>
                    <div className="">{date}</div>
                </div>
                <div className="flex  justify-between min-h-8 max-h-28 gap-5">
                    <div className="flex flex-col ">
                        <div className="font-bold text-2xl overflow-hidden">{title.slice(0, 50 ) + "..."}</div>
                        <div className="font-serif overflow-hidden">{content.slice(0, 370) + "..." }</div>
                    </div>
                    <div className="min-w-32 max-h-28 border-4 border-slate-400 mr-4 rounded-xl hidden sm:block">
                        {postPhoto}
                    </div>
                </div>
                <div className="flex gap-2 ">
                    <div className="text-white bg-slate-500 px-2 rounded-xl">{genre}</div>
                    <div className="font-serif">{`${Math.ceil(content.length/100)} min read`}</div>
                </div>
            </div>
        </div>
        
    )
}


function Avatar() : JSX.Element {
    return(
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
    
    )
}