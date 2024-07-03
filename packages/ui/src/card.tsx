
interface cardProps {
  title : string,
  children : React.ReactNode,
  scrollable ?: boolean
  
}


const Card = ({title,children,scrollable}:cardProps) => {

  
  return (
    <div  className={`border border-gray-300 shadow-lg rounded-lg p-6 bg-white ${scrollable ? ` max-h-64 overflow-y-auto`: ``}`}>
        <div className="text-xl border-b pb-2 font-bold text-[#6a51a6]">{title}</div>
        {children}
    </div>
  )
}

export default Card