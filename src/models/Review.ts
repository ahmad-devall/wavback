import mongoose, { Schema, Document, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid'

export interface IReview extends Document {
    _id: string
    name: string
    dealer_id: string
    title: string
    review: string
    customer_service: number
    buying_process: number
    overall_experience: number
    recommendation: string
    created_at: number
}

const reviewSchema = new Schema<IReview>({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    dealer_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    customer_service: {
        type: Number,
        required: true
    },
    buying_process: {
        type: Number,
        required: true
    },
    overall_experience: {
        type: Number,
        required: true
    },
    recommendation: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now
    }
})

export default model<IReview>('Review', reviewSchema)