import mongoose from "mongoose";

const vechicleSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true  
    },

    image: {
        type: [String],
        default:[],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
})


export default mongoose.model('Vechicle', vechicleSchema)