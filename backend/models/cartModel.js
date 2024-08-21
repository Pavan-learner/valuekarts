import mongoose from 'mongoose';

const cartModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
            quantity: { type: Number, default: 1 }
        }
    ],
    total: { type: Number, default: 0 }
})

export default mongoose.model('Cart', cartModel)