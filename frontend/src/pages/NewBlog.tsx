
import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../compnents/Button";
import  { BlogPost } from "@amjuz/medium-blog"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);
    const [ alertMessage, setAlertMesasge ] = useState(false);

    const [ titleVisibility, setTitleVisibility ] = useState(false);
    const handleTitleFocus = () => setTitleVisibility(true)
    const handleTitleBlur = () => setTitleVisibility(false)

    const [ contentVisibility, setContentVisibility ] = useState(false);
    const handleContentFocus = () => setContentVisibility(true)
    const handleContentBlur = () => setContentVisibility(false)

    const [ BlogDetails, setBlogDetails ] = useState<BlogPost>({
        title: "",
        content: "",
        genre: ""
    }) 
    
    

    const publishBlog = async () => {

        if( !BlogDetails.title || !BlogDetails.content || !BlogDetails.genre ){
            setAlertMesasge(true)
            setTimeout(() => {
                setAlertMesasge(false)
            }, 2000);
            return null;
        }
        setLoading(true)
    
        try{
            const res = await  axios.post(`${BACKEND_URL}/api/v1/blog/post`,{
                title: BlogDetails.title, 
                content: BlogDetails.content,
                genre: BlogDetails.genre
            },{
                headers: {
                    authorization: localStorage.getItem('token')
                },
            })
           
            setLoading(false)
            navigate(`/blog/${res.data.id}`);
        } catch(e) {
            setLoading(false)
            console.log(e);
        }
        
    }

    
    return (
        <div className=" h-screen w-screen flex justify-center  gap-2 pt-2">
                
                <div className=" flex flex-col  gap-4 w-5/12 p-2 min-w-96">
                    <div className="flex " onFocus={handleTitleFocus} onBlur={handleTitleBlur}>
                        <button className={`pr-2 ${ titleVisibility ? 'visible' : 'invisible'} `}>
                            <CirclePlusIcon 
                                strokeWidth={1} 
                                size={50} 
                                />
                        </button>
                        <div className={`text-5xl font-cormorant border-l  w-full`}>
                            <input type="text" 
                                placeholder="Title" 
                                className={`px-2 focus:outline-none w-full `}
                                required
                                onChange={ e => {
                                    setBlogDetails( c => ({
                                        ...c,
                                        title: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex "  onFocus={handleContentFocus} onBlur={handleContentBlur}>
                        <div className="">
                            <button className={`pr-2 pl-3 ${ contentVisibility ? 'visible' : 'invisible'} `}>
                                <CirclePlusIcon 
                                    strokeWidth={1}
                                    size={30}
                                />
                            </button>
                        </div>
                        <div className="text-2xl font-cormorant border-l ml-2 break-normal  w-full h-full">
                            <textarea 
                                className="focus:outline-none block w-full h-64 px-2 text-gray-800"
                                placeholder="Tell your story" 
                                required 
                                onChange={ e => {
                                    setBlogDetails( c =>({
                                        ...c,
                                        content: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex " >
                        <div className="text-2xl font-cormorant border-l ml-14 break-normal w-full h-full">
                            <input 
                                className="focus:outline-none block w-full px-2 text-gray-800"
                                placeholder="genre" 
                                maxLength={15}
                                required
                                onChange={ e => {
                                    setBlogDetails( c => ({
                                        ...c,
                                        genre: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className="relative  w-full flex justify-end ">
                        <Button 
                            type="submit"
                            label="Publish"
                            onClick={publishBlog}
                            loading={loading}
                            className="rounded-lg font-bold  hover:text-gray-400"
                        />
                        { alertMessage ? (
                            <div className="absolute grid w-fit h-max top-full  "> please provide input details</div>
                            
                        ):( null ) }
                    </div>
                    
                </div>
            </div>
    );
}