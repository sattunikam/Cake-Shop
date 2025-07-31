const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // purchasedCakes:[
  //     {
  //         name:  String,
  //         image: String,
  //         price: String
  //     }
  // ],

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("customer", customerSchema);
