import { boolean, object } from "joi";
import mongoose, { Schema, Document, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid'

export interface IWav extends Document {
    _id: string
    owner: string
    images: string[]
    price: string
    condition: string
    make: string
    models: string
    year: number
    body: string
    engine: string
    size: string
    entrance: string
    doors: string
    mileage: string
    transmission: string
    wav_type: string
    space: string
    stock_id: string
    fuel_type: string
    exterior_colour: string
    seating: string
    conversion: string
    features: string[]
    featured: boolean
    description: string
    status: string
    title: string
    created_at: number
}

const wavSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    owner: {
        type: String,
        ref: 'Dealer',
        required: true
    },
    images: {
        type: [String]
    },
    price: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ['used', 'new', 'motability'],
        required: true
    },
    make: {
        type: String,
        required: true
    },
    models: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    engine: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    entrance: {
        type: String,
        required: true,
    },
    doors: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
    },
    wav_type: {
        type: String,
        required: true,
    },
    space: {
        type: String,
        required: true,
    },
    stock_id: {
        type: String,
        required: true,
    },
    fuel_type: {
        type: String,
    },
    exterior_colour: {
        type: String,
        required: true,
    },
    seating: {
        type: String,
        required: true,
    },
    conversion: {
        type: String,
    },
    features: {
        type: [String]
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    },
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        expires: '30d',
        default: Date.now
    }
})

export default model<IWav>('Wav', wavSchema)