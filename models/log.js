const mongoose = require("mongoose");
const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mealType: { type: String, required: true, default: "None" },
  isBeverage: { type: Boolean, default: false },
  totalResident: { type: Number, required: true, default: 0 },
  totalGuest: { type: Number, required: true, default: 0 },
  totalHD: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("Log", logSchema);
