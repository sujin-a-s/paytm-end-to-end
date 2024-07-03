
interface centerProps {
    children : React.ReactNode
}

const Center = ({children}:centerProps)=>{
    return (
        <div className="flex flex-col justify-center items-center">
            {children}
        </div>
    )
}

export default Center