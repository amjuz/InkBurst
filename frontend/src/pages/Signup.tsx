import { Auth } from "../compnents/Auth";
import { Quote } from "../compnents/Quote";

export function Signup(){
    return(
        <div className="grid grid-cols-1 h-screen lg:grid-cols-2 ">
            <div className="pt-44 bg-neutral-400">
                <Auth type="signup"/>
            </div>
            <div className="pt-80 bg-slate-200 invisible sm:visible ">
                <Quote/>
            </div>
        </div>
    )
}