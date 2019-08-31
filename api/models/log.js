const mongoose = require("mongoose");
const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true, default: Date.now },
  mealType: { type: String, required: true }
});

module.exports = mongoose.model("Log", logSchema);
