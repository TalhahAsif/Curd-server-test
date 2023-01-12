const mongoose = require("mongoose");
const schema = mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  // id:{
  //   type: String,
  //   required: true
  // }
});

const postModel = mongoose.model("Posts", schema);

module.exports = postModel;
