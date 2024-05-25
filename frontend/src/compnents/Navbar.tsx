import { useNavigate } from 'react-router-dom';
import { Button } from './Button'

export function Navbar(){
    const navigate = useNavigate();
    return (
        <div className={` grid grid-cols-2 text-white bg-black w-full h-20 fixed z-50 top-0 left-0 right-0 shadow-xl `}>
            <div className="flex justify-center  items-center text-xl gap-2 font-semibold">
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                InkBurst
            </div>
            <div className="flex items-center justify-end pr-4 gap-2">
                <a href="/signin">
                    <Button className='hover:text-black hover:bg-white text-black' label='Signin' />
                </a>
                <a href="/signup">
                    <Button className='  hover:text-black hover:bg-white text-black' label='Signup'/>
                </a>
                {<Button className="hover:text-black hover:bg-white" label='logout' onClick={()=>{
                     localStorage.removeItem("token");
                     navigate("/signin")
                }}/>}
            </div>
        </div>
    )
}