"use client"
import Card from '@repo/ui/card'
import Center from '@repo/ui/center'
import TextInput from '@repo/ui/textinput'
import Select from '@repo/ui/select'
import React, { useState } from 'react'
import { Button } from '@repo/ui/button'
import onramptransactionActions from '../lib/onramptransactionActions'
import { AddmoneyInputs ,addmoneySchema } from '@repo/db/zodclient'
import { toast } from 'react-hot-toast'


const AddmoneyComponent = () => {

    const SUPPORTED_BANKS = [
        {
            bankname : "Hdfc Bank",
            redirectUrl : "https://netbanking.hdfcbank.com/netbanking/"
        },
        {
            bankname : "Axis Bank",
            redirectUrl :  "https://www.axisbank.com/"
        }
    ]

    const [redirectUrl,setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.bankname || "")
    const [amount,setAmount] = useState(0)

  return (

        <Card title="Add Money">
            <Center>
                <TextInput onInputChange={(value)=>
                    setAmount(Number(value))
                    }
                    label='Amount' numeric/>
                <Select label="Bank" onSelect = {
                    (value)=>{
                        setRedirectUrl(SUPPORTED_BANKS.find(x=> x.bankname == value)?.redirectUrl || "")
                        setProvider(SUPPORTED_BANKS.find(x=> x.bankname == value)?.bankname || "")
                    }

                } options={SUPPORTED_BANKS.map(
                    x => ({
                        key : x.bankname,
                        value : x.bankname
                    })
                )}></Select>
                <div className='mt-4 w-2/5'>
                <Button classname="bg-[#524568] text-white" 
                    onClick={async()=>{
                        try {
                            const parsed : AddmoneyInputs = addmoneySchema.parse({amount,provider})
                            await onramptransactionActions(amount, provider);
                            window.location.href = redirectUrl || "";
                        } catch (error : any) {
                            console.error("Failed to add money:", error.message);
                            toast.error("Failed to add money")
                        }
                    }}>Add Money</Button>
                </div>
            </Center>
        </Card>

  )
}

export default AddmoneyComponent