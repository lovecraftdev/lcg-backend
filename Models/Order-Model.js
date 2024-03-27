import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
      },
      product: [{
        title: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product' // Reference to the Product model
        },
        quantity: {
          type: Number,
        },
         price: {
        type: Number,
      },
      }],
     
      status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

export  const Order = mongoose.model("orders", orderSchema)