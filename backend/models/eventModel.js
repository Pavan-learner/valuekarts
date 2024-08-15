import mongoose from "mongoose";
 
const EventModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    image:{
        type: [String],
        default:[],
    }
});

export default mongoose.model('Event', EventModel)