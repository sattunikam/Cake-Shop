const mongoose = require("mongoose");

const purchasedCakeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  cakeName: {
    type: String,
    required: true,
  },
   image: {
    type: String, 
    required: true,
  },
  amount: Number,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PurchasedCake", purchasedCakeSchema);
