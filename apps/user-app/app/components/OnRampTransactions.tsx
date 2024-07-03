import Card from '@repo/ui/card'
import Center from '@repo/ui/center'
import React from 'react'

interface OmrampTransationProps {
    transactions : {
        status : string,
        amount : number,
        createdAt : Date
    }[]

}

const OnRampTransactions = ({transactions}:OmrampTransationProps) => {
    return (
        <Card title="Onramp Transactions" scrollable>
                <div className='pt-2'>
                    {transactions.length==0 ?(
                        <div>No Transactions</div>
                    ):(transactions.map(
                        x => (
                            <div className='flex justify-between mb-2'>
                                <div>
                                    <div className="text-sm">Received INR</div>
                                    <div className='text-slate-600 text-xs'>{x.createdAt.toDateString()}</div>
                                </div>
                                <div className='flex flex-col justify-center'>{(x.amount)/100}</div>
                            </div>
                        )
                    ))
                    }
                </div>
        </Card>
      )
}

export default OnRampTransactions