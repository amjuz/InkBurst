
import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../compnents/Button";

export const NewBlog = () => {

    const [ titleVisibility, setTitleVisibility ] = useState(false);
    const handleTitleFocus = () => setTitleVisibility(true)
    const handleTitleBlur = () => setTitleVisibility(false)

    const [ contentVisibility, setContentVisibility ] = useState(false);
    const handleContentFocus = () => setContentVisibility(true)
    const handleContentBlur = () => setContentVisibility(false)

    return (
        
            <div className="h-screen w-screen flex justify-center  gap-2 pt-2">
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
                            />
                        </div>
                    </div>
                    <div className="flex"  onFocus={handleContentFocus} onBlur={handleContentBlur}>
                        <div className="">
                            <button className={`pr-2 pl-3 ${ contentVisibility ? 'visible' : 'invisible'} `}>
                                <CirclePlusIcon 
                                    strokeWidth={1}
                                    size={30}
                                />
                            </button>
                        </div>
                        <div className="text-2xl font-cormorant border-l ml-2 break-normal  w-full h-full">
                            <textarea id=""  className="focus:outline-none block w-full h-64 px-2  text-gray-800 " placeholder="Tell your story" required />
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button label="Publish"/>
                    </div>
                </div>
            </div>
           
        
    );
}