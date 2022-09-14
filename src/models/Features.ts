import mongpose, { Schema, Document, model } from "mongoose"
import { v4 as uuidv4 } from "uuid"
export interface IFeatures extends Document {
    _id: string
    title: string
    created_at: number
}

const featuresSchema = new Schema<IFeatures>({
    _id: {
        type: String,
        default: uuidv4
    },
    title: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Number,
        default: Date.now
    }
})

export default model<IFeatures>('Features', featuresSchema)

