
interface selectProps {
    onSelect : (value : string)=>void,
    options : {
      key : string,
      value : string
    }[],
    label : string
}

const Select = ({options,onSelect,label}:selectProps) => {
  return (
    <div className="w-full mt-3">
        <div className="block mb-2 font-medium text-gray-900">{label}</div>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e)=>onSelect(e.target.value)}>
                {options.map(
                  x=>(<option value={x.key}>{x.value}</option>)
                )}
        </select>
    </div>
     
  )
}

export default Select