import { Link, useNavigate } from "react-router-dom";
import { SignupInput, SigninInput } from "@amjuz/medium-blog"
import { ChangeEvent, useState } from "react";3
import { Button } from '../compnents/Button'
import axios from "axios";
import { BACKEND_URL } from '../config'
import { LoadingButton } from "./LoadingButton";


export function Auth({ type }: {
    type: "signup" | "signin"
}){
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState(false);
    const [ alertMessage, setAlertMesasge ] = useState("")

    const [ signupDetails, setSignupDetails ] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
        
    })

    const [ signinDetails, setSigninDetails ] = useState<SigninInput>({
        email: "",
        password: ""
    })


    async function signinRequest(){

        if(!signinDetails.email || !signinDetails.password ){
            return setAlertMesasge('input fields cannot be empty')
        }
        try{
            
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, signinDetails);
            const token = res.data?.token;
            localStorage.setItem('token', token);
            setLoading(false)
            navigate("/blogs")
        } catch(e) {
            setLoading(false)
            setAlertMesasge("request failed, please try again")
        }
        
    }
    
    async function signupRequest() {
        try {
            if(!signupDetails.email || !signupDetails.password || !signupDetails.name ){
                return setAlertMesasge('Input fields cannot be empty')
            }
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, signupDetails);
            const token = res.data;
            if(token){
                setLoading(false);
                navigate('/signin')
                setAlertMesasge("Signup successfull")
            } else {
                setLoading(false);
                setAlertMesasge("request failed ")
            }
        } catch(e) {
            setLoading(false);
            setAlertMesasge("request failed ")
        }
    }

    return(
        <div className="flex flex-col justify-center ">
            <div className="flex justify-center">
                <div className="w-3/5">
                    <div className="text-center  ">
                        <p className="text-4xl font-black">{ type === "signin" ? "Sign In To Your Account " : "Create an account "}</p>
                        <p className="pt-2 text-neutral-200">{ type === "signin" ? "Don't have an account ? " : ("Already have an account ? ")} 
                            <Link className="underline" to={ type === "signin" ? "/signup" : "/signin"}>
                                { type === "signin" ? "signup" : "signin" }
                            </Link>
                        </p>
                    </div>
                    <div className="pt-7">
                        { type === "signin" ? null : 
                            <InputDetails 
                                label="Username"
                                placeholder= "Enter your username" 
                                type="text" 
                                onChange={ (e) => {
                                setSignupDetails(c => ({
                                    ...c,
                                    name: e.target.value
                                }))
                            }}/>
                        }

                        <InputDetails 
                            label="Email" 
                            placeholder= "email@example.com" 
                            type="text" 
                            onChange={(e)=>{

                            { type === "signin" ? (
                                setSigninDetails( (c) => ({
                                    ...c,
                                    email: e.target.value
                                }))
                            ) : (
                                setSignupDetails( (c) => ({
                                    ...c,
                                    email: e.target.value
                                }))
                            )}
                        }}/>

                        <InputDetails 
                            label="password" 
                            type="password" 
                            placeholder="password" 
                            onChange={(e) => {

                            { type === "signin" ? (
                                setSigninDetails( (c) => ({
                                    ...c,
                                    password: e.target.value
                                }))
                            ) : (
                                setSignupDetails( (c) => ({
                                    ...c,
                                    password: e.target.value
                                }))
                            )}
                        }}/>
                        <Button 
                            className="w-full mt-3 grid place-content-center rounded-lg" 
                            onClick={type === "signin" ? signinRequest : signupRequest } 
                            label={ type === "signin" ? (loading ? (<LoadingButton/>) : "SignIn") : (loading ? (<LoadingButton/>) : "SignUp")} 
                        />

                        { alertMessage && <div className="flex justify-center text-red-500 font-bold mb-4">{alertMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputDetails({ label, onChange, placeholder,type,  }: {
    label: string,
    placeholder?: string,
    type: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    

}){
    return (
        <div className="flex flex-col gap-2 py-2 ">
            <label className="block mb-2 text-base font-semibold text-gray-900">{label}</label>
            <input onChange={onChange}  type={type} className="bg-gray-50 border border-gray-300 text-gray-900 dark:placeholder-gray-400
             p-2 rounded-md" placeholder={placeholder} required />
        </div>
    )
}