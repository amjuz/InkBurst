
export function Button({ label, className, onClick }: {
    label: string,
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>)=> void , 
    
}) {

    // function onClickRequest(){
    //     return null
    // }
    return(
        <button className={`text-white bg-black px-7 py-2 rounded-md  font-medium  ${className}`} onClick={onClick}>
            {label}
        </button>
    )
}