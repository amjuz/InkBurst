
export function Button({ label, className, onClick }: {
    label: string,
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>)=> void, 
}) {
    return(
        <button className={className} onClick={onClick}>
            {label}
        </button>
    )
}