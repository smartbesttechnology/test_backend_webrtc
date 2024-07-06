const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Riderschema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model("user", Riderschema);
module.exports = {
  userModel,
};
