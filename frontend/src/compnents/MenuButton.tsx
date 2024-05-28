import { useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const MenuButton = () => {
    const navigate = useNavigate();

    const [ isOpen, setIsOpen ] = useState(false);
    

    return(
        <div className="relative">
            <button 
                className="bg-black rounded-lg px-10 py-2 hover:text-black hover:bg-white text-white font-bold"
                onMouseEnter={ () => setIsOpen(true) }
                onMouseLeave={ () => setIsOpen(false) }
            >
                Menu
            </button>
            {isOpen && (
                <ul 
                    className="absolute bg-black w-full text-white  rounded-md top-full left-0 right-0 pt-2"
                    onMouseEnter={ () => setIsOpen(true)} 
                    onMouseLeave={ () => setIsOpen(false)}
                >
                    <div className="grid place-content-center">
                        
                        <a href="/signin">
                            <Button className='hover:text-zinc-400 text-black ' label='Signin' />
                        </a>
                        <a href="/signup">
                            <Button className='  hover:text-zinc-400  text-black' label='Signup'/>
                        </a>
                        <Button 
                            className="hover:text-zinc-400 "
                            label='logout'
                            onClick={()=>{
                                localStorage.removeItem("token");
                                navigate("/signin");
                            }}
                        />

                    </div>
                </ul>
            )}
        </div>
    )
}