
export function Button({ label, className, onClick, children, loading, type }: {
    type?: "submit" | "reset" | "button" | undefined,
    children?: JSX.Element,
    loading?: boolean,
    label: string | JSX.Element,
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>)=> void , 
    
}) {

    

    return(
        <button 
            className={`text-white bg-black px-7 py-2 ${className}`} 
            onClick={onClick}
            type={type}
        >
            <div className="flex gap-2">
                {children}
                {loading ? "wait" : (label)}
            </div>
        </button>
    )
}