import { BlogCard } from "../compnents/BlogCard";

export function Blog(){
    return(
        <div className="max-w-screen min-h-screen bg-slate-200 flex flex-col gap-3 pt-4 items-center">
            <div className="flex flex-col gap-2 w-full  max-w-6xl max-h-full min-h-96 ">
                <BlogCard 
                    name={"Peter"} 
                    date={"Dec 03, 2023"} 
                    title={"Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem"} 
                    content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis accusantium fugit Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis "}
                    postPhoto= {"post photo"} 
                    genre={"side hustle"} 
                />
                <BlogCard 
                    name={"Peter"} 
                    date={"Dec 03, 2023"} 
                    title={"Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem"} 
                    content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis accusantium fugit Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis "}
                    postPhoto= {"post photo"} 
                    genre={"side hustle"} 
                />
                <BlogCard 
                    name={"Peter"} 
                    date={"Dec 03, 2023"} 
                    title={"Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem"} 
                    content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis accusantium fugit Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis "}
                    postPhoto= {"post photo"} 
                    genre={"side hustle"} 
                />
                <BlogCard 
                name={"Peter"} 
                date={"Dec 03, 2023"} 
                title={"Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem"} 
                content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis accusantium fugit Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est porro dicta expedita omnis corrupti cum iusto molestiae voluptas rem, aliquid explicabo deserunt distinctio esse delectus amet corporis "}
                postPhoto= {"post photo"} 
                genre={"side hustle"} 
            />
            </div>
            
        </div>
    )
}