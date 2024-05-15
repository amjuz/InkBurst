import { Link } from "react-router-dom";
import { SignupInput, SigninInput } from "@amjuz/medium-blog"
import { ChangeEvent, useState } from "react";3
import { Button } from '../compnents/Button'


export function Auth({ type }: {
    type: "signup" | "signin"
}){
    const [ signupDetails, setSignupDetails ] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
        
    })

    const [ signinDetails, setSigninDetails ] =useState<SigninInput>({
        email: "",
        password: ""
    })

    return(
        <div className="flex flex-col justify-center h-lvh ">
            <div className="flex justify-center">
                <div className="w-3/5">
                    <div className="text-center  ">
                        <p className="text-4xl font-black">{ type === "signin" ? "Sign In To Your Account " : "Create an account "}</p>
                        <p className="pt-2 text-gray-500">{ type === "signin" ? "Don't have an account ? " : ("Already have an account ? ")} 
                            <Link className="underline" to={ type === "signin" ? "/signup" : "/signin"}>
                                { type === "signin" ? "signup" : "signin" }
                            </Link>
                        </p>
                    </div>
                    <div className="pt-7">
                        { type === "signin" ? null : 
                            <InputDetails label="Username" placeholder= "Enter your username" type="text" onChange={ (e) => {
                                setSignupDetails(c => ({
                                    ...c,
                                    name: e.target.value
                                }))
                            }}/>
                        }

                        { type === "signup" ?
                        JSON.stringify(signupDetails):
                        JSON.stringify(signinDetails)
                        }

                        <InputDetails label="Email" placeholder= "email@example.com" type="text" onChange={(e)=>{
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
                        <InputDetails label="password" type="password" placeholder="password" onChange={(e) => {
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
                        <Button className="text-white bg-black px-7 py-2 rounded-md mt-3 w-full font-medium hover:bg-" label={ type === "signin" ? "SignIn" : "SignUp"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputDetails({ label, onChange, placeholder,type }: {
    label: string,
    placeholder?: string,
    type: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,

}){
    return (
        <div className="flex flex-col gap-2 py-2 ">
            <label className="block mb-2 text-base font-semibold text-gray-900">{label}</label>
            <input onChange={onChange}  type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 dark:placeholder-gray-400
             p-2 rounded-md" placeholder={placeholder} required />
        </div>
    )
}