import mongpose, { Schema, Document, model } from "mongoose"
import { v4 as uuidv4 } from "uuid"
export interface IPayment extends Document {
    _id: string
    owner: string
    type: string
    price: number
    created_at: number
}

const paymentSchema = new Schema<IPayment>({
    _id: {
        type: String,
        default: uuidv4
    },
    owner: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now
    }
})

export default model<IPayment>('Payment', paymentSchema)

