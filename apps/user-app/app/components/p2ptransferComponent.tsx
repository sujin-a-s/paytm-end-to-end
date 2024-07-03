"use client"
import { Button } from "@repo/ui/button"
import Card from "@repo/ui/card"
import Center from "@repo/ui/center"
import TextInput from "@repo/ui/textinput"
import { useState } from "react"
import p2ptransferactions from "../lib/p2ptransferactions"
import { p2ptransferInputs,p2ptransferSchema } from "@repo/db/zodclient"
import { toast } from 'react-hot-toast'




const P2ptransferComponent = ()=>{
    const [amount,setAmount] = useState(0)
    const [number,setNumber] = useState("")




    return(
        
            <Card title="Send">
                <Center>
                    <TextInput numeric label="Number" onInputChange={(value)=>setNumber(String(value))}/>
                    <TextInput numeric label="Amount" onInputChange={(value)=>setAmount(Number(value))}/>
                    <Button classname="text-white bg-[#524568] mt-4 w-3/5" 
                    onClick={async()=>{
                            try{
                                const parsed : p2ptransferInputs = p2ptransferSchema.parse({amount,number})
                                const result : any = await p2ptransferactions(number,amount)
                                console.log(result)
                                if (result?.success) {
                                    toast.success("Money transacted successfully");
                                  } else {
                                    toast.error(result.message);
                                  }
                            }catch(e){
                                console.log(e)
                                toast.error("Failed to send money")
                            }

        
                    }}>Send</Button>
                </Center>
            </Card>
     
    )
}

export default P2ptransferComponent