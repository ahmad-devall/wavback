import mongpose, { Schema, Document, model } from "mongoose"
import { v4 as uuidv4 } from "uuid"
export interface IAdmin extends Document {
    _id: string
    name: string
    email: string
    login: string
    password: string
    created_at: number
}

const adminSchema = new Schema<IAdmin>({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now
    }
})

export default model<IAdmin>('Admin', adminSchema)

