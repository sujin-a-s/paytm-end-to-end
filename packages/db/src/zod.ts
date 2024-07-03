import {z} from 'zod'


export const addmoneySchema = z.object({
    amount : z.number().positive("Enter a valid amount greater than zero"),
    provider : z.string().min(1)
})

export const p2ptransferSchema = z.object({
    amount : z.number().positive("Enter a valid amount greater than zero"),
    number : z.string().min(10)
})






export type AddmoneyInputs = z.infer<typeof addmoneySchema>
export type p2ptransferInputs= z.infer<typeof p2ptransferSchema>