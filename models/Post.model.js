const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: {
      type: String,
      enum: ["Laptop", "Tablet", "Mobile"],
      required: true,
    },
    no_of_comments: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("instaPost", postSchema);

module.exports = { PostModel };
