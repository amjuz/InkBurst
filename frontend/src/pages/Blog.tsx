import { useNavigate } from "react-router-dom"

export function Blog(){
    const navigate = useNavigate();
    return(
        <div className="">
            blogs
            <button className="bg-black text-white p-2" onClick={()=>{
                localStorage.removeItem("token");
                navigate("/signin")
            }}>logout</button>
        </div>
    )
}