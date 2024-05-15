import { Auth } from "../compnents/Auth";
import { Quote } from "../compnents/Quote";


export function Signin(){
    return(
        <div className="grid grid-cols-2 ">
            <div className="">
                <Auth type="signin"/>
            </div>
            <div className="bg-slate-200 h-lvh invisible sm:visible ">
                <Quote/>
            </div>
        </div>
    )
}

