"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";
import { v4 as uuidv4 } from 'uuid';

interface SessionProps {
    user: {
        id: string;
    };
}

export default async function onramptransactionActions(amount: number, provider: string) {
    try {
        const session: SessionProps | null = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            throw new Error("User session not found or invalid");
        }

        const token = generateSecureToken();

        const transaction = await prisma.onramptransactions.create({
            data: {
                provider,
                status: "Processing",
                token,
                userId: Number(session.user.id),
                amount: amount * 100
            }
        });

        const balanceUpdate = await prisma.balance.upsert({
            where : {
                userId : Number(session.user.id)
            },
            update: {
                locked: {
                  increment: amount*100, 
                },
              },
            create : {
                amount : 0,
                userId : Number(session.user.id),
                locked : amount*100
            }
        })

        return transaction;

    } catch (error : any) {
        console.error("Error creating transaction:", error.message);
        throw new Error("Failed to create transaction: " + error.message);
    }
}

function generateSecureToken() {
    return uuidv4();
}
