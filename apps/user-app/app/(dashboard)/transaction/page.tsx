import P2ptransferComponent from "../../components/p2ptransferComponent"

const Transaction = ()=>{
    return (
        <div className="w-screen border  ">
            <div className="text-4xl font-bold text-[#6a51a6] pt-8 mb-8">Transactions</div>
            <div className="flex justify-center">
                <div className="p-3 border w-2/6 ">
                    <P2ptransferComponent/>        
                </div>
            </div>

        </div>
        
    )
}
export default Transaction