import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category:{
            type:String,
            required:true
        },
        user: {
            type: mongoose.ObjectId,
            ref: 'user'
        }

    }, { timestamps: true }
)

const ProductModel = mongoose.model('Products', ProductSchema)

export default ProductModel