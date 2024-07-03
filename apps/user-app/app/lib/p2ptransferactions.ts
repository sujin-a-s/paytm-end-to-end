"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { toast } from "react-hot-toast"
import { authOptions } from "./auth"

interface SessionProps {
    user : {
        id : string
    }
}
export default async function p2ptransferactions (number:string,amount:number){
    try{
        const session : SessionProps | null = await getServerSession(authOptions)

        if (!session  || !session?.user  || !session?.user?.id){
            throw new Error ("you are not authenticated")
        }
        console.log("session : ",session)
        const toUser = await prisma.user.findFirst({
            where : {
                number : String(number)
            }
        })

        if (!toUser){
            return {
                message : "User not found",
                success : false
            }
        }


        const result = await prisma.$transaction(async(tx)=>{
            const fromBalance = await tx.balance.findUnique({
                where : {
                    userId : Number(session.user.id)
                }
            })
            
            if (!fromBalance || fromBalance.amount/100 < Number(amount)){
                return {
                    message : "insuffiecient funds",
                    success : false
                }
            }

            await tx.balance.update({
                where : {userId : Number(session.user.id)},
                data : {amount:{decrement:Number(amount)*100}}
            })

            await tx.balance.update({
                where : {userId : Number(toUser.id)},
                data : {amount : {increment :Number(amount)*100}}
            })

            return {
                message : "SUCCESS",
                success : true
            }
        })

        console.log(result)
        return result



    }catch(e : any){
        console.log("error while p2p transfer", e.message)
    }
}