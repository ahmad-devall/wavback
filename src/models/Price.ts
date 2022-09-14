import mongpose, { Schema, Document, model } from "mongoose"
import { v4 as uuidv4 } from "uuid"
export interface IPrice extends Document {
    _id: string
    individual: string
    packeg_1: string
    packeg_2: string
    packeg_3: string
    created_at: number
}

const priceSchema = new Schema<IPrice>({
    _id: {
        type: String,
        default: uuidv4
    },
    individual: {
        type: String,
        required: true
    },
    packeg_1: {
        type: String,
        required: true
    },
    packeg_2: {
        type: String,
        required: true
    },
    packeg_3: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now
    }
})

export default model<IPrice>('Price', priceSchema)

