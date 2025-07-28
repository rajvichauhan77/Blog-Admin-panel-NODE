const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String // image path
  }
});

module.exports = mongoose.model("categoryTbl", categorySchema);
