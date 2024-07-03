import AddmoneyComponent from "../../components/AddmoneyComponent"
import {BalanceComponent} from "../../components/BalanceComponent"
import { getServerSession } from "next-auth";
import axios from "axios"
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import OnRampTransactions from "../../components/OnRampTransactions";

interface SessionProps {
    user : {
        id : string
    }
}

interface BalanceDetails {
    amount : number,
    locked : number
}

interface OnRampTransactionsProps {
    amount : number,
    status : string,
    createdAt : Date
}

async function getBalance(): Promise<BalanceDetails> {
    const session : SessionProps | null = await getServerSession(authOptions);

    if (!session?.user){
        throw new Error ("You are not authenticated")
    }

    const userId = session.user.id
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(userId)
        }
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnrampTransactions(): Promise<OnRampTransactionsProps[]> {
    const session : SessionProps | null = await getServerSession(authOptions)
    if (!session?.user){
        throw new Error ("You are not authenticated")
    }

    const transactions = await prisma.onramptransactions.findMany({
        where :{
            userId : Number(session.user.id)
        },
        select : {
            amount : true,
            status :true,
            createdAt : true
        }
    })

    return transactions

}

const Transfer = async()=>{
    const balance = await getBalance()
    const transactions = await getOnrampTransactions()

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 p-4">
            <div className="col-span-5">
                <AddmoneyComponent />
            </div>
            <div className="col-span-7">
                <BalanceComponent amount={balance.amount} locked={Number(balance.locked)} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}

export default Transfer