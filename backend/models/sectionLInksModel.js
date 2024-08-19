import mongoose from 'mongoose';

const sectionLInksModel = new mongoose.Schema({
    image:{
        type: [String],
        default:[],
        required: true
    }
});

export default mongoose.model('Section', sectionLInksModel)