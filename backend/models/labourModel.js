import mongoose from "mongoose";

const labourSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true  
    },

    image: {
        type: String,
        default:""
    },

}
)


export default mongoose.model('Labour', labourSchema)