const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const Price = {
  old: Number,
  new: Number,
};

const varients = {
  id: String,
  value: String,
  price: Price,
};

let item = new mongoose.Schema(
  {
    itemCode: {
      type: Number,
      default: 0,
      unique: false,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Price,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    discp: {
      type: String,
    },
    varients: {
      type: varients,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/**
 * Helper method for getting user's gravatar.
 */
autoIncrement.initialize(mongoose.connection);
item.plugin(autoIncrement.plugin, {
  model: "item",
  field: "itemCode",
  startAt: 3240,
  incrementBy: 1,
});

const Item = mongoose.model("item", item);

module.exports = Item;


