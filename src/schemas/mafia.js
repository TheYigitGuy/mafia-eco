const mongoose = require("mongoose");

const organizeSchema = new mongoose.Schema({
  ownerID: { type: String, require: true, unique: true },
  money: { type: Number, default: 10000 },
  secured: { type: Number },
  workers: { type: Number, default: 1 },
  inventory: { type: Array, default: [] },
  guns: {
    type: Array,
    default: [
      {
        name: "AK-47",
        power: 1,
        price: 0,
      },
    ],
  },
  hq: { type: String, require: true },
  cooldowns: { type: Array, default: [] },
});

const model = mongoose.model("OrganizeModels", organizeSchema);

module.exports = model;
