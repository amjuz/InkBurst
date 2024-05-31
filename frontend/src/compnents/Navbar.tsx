import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button'
import { MenuButton } from './MenuButton';


export function Navbar(){
    const navigate = useNavigate()
    return (
        <div className={` grid grid-cols-2 text-white bg-black w-full h-20 fixed z-50 top-0 left-0 right-0 shadow-xl`}>
            <div className="flex justify-center  items-center text-xl gap-2 font-semibold">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className={ `lucide lucide-book-open `}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>

                <Link to={'/blogs'}>InkBurst</Link>
            </div>
            <div className="flex items-center justify-end pr-4 gap-2">
                <Button
                     className='font-bold hover:bg-white hover:text-black rounded-lg' 
                     label='Write' 
                     children={
                         <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            className="lucide lucide-pen"
                        >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                        </svg>
                        }
                    onClick={()=>navigate('/new-story')}
                />               
                <Button 
                    className='font-bold hover:bg-white hover:text-black rounded-lg' 
                    label={"All Blogs"}
                    onClick={()=>navigate('/blogs')}
                />
                <MenuButton/>
            </div>
        </div>
    )
}