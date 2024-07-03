import express from "express";
import prisma from "@repo/db/client";
const app = express()
app.use(express.json()); 
app.post("/hdfcwebhook",async(req,res) =>{
    interface paymentInformationProps {
        token : string,
        userId : string,
        amount :string,
        provider : string
    }

    const paymentInformation : paymentInformationProps = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount,
        provider : req.body.provider
    }

    if(paymentInformation.provider !== "Hdfc Bank" && paymentInformation.provider !=="Axis Bank" ){
        return res.status(400).json({
            message : "Invalid Provider"
        })
    }

    try{
        await prisma.$transaction([
            prisma.balance.updateMany({
                where :{
                    userId : Number(paymentInformation.userId),
                },
                data : {
                    amount : {
                        increment : Number(paymentInformation.amount)*100
                    },
                    locked : {
                        decrement : Number(paymentInformation.amount)*100
                    }
                }
            }),
            prisma.onramptransactions.updateMany({
                where : {
                    userId : Number(paymentInformation.userId),
                    provider : paymentInformation.provider
                },
                data : {
                    status : "Success"
                }
            })
        ])
        res.status(200).json({
            message : "captured"
        })

    }catch(e){
        console.log(e)
        res.status(411).json({
            message : "Error while processing webhook"
        })

    }
})


app.listen(3002)