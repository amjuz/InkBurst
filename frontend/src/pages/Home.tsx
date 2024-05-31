import { useNavigate } from "react-router-dom"
import { Button } from "../compnents/Button"
import { HomePageCard } from "../compnents/HomePageCard"

export function Home(){
    const navigate = useNavigate();
    return (

        <div className="grid grid-cols-2 bg-yellow-500 w-full h-screen">
                <div className="flex justify-end items-center -mt-40 ">
                    <div className="flex flex-col gap-10  w-4/5 h-96">
                        <div className=" w-fit text-9xl font-cormorant ">
                            Stay curious.
                        </div>
                        <div className="w-2/3 font-medium  text-2xl">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </div>
                        <div className="">
                            <Button 
                                className='rounded-full w-52 flex justify-center' 
                                label={'Start Reading'}
                                onClick={()=>navigate('/signin')}
                                />
                        </div>                         
                    </div>
                </div>
                <HomePageCard/>
        </div>
    )
}