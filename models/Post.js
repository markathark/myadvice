const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    shortdesc: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      default: [],
      required: true,
    },
    comments: [
      {
        name: String,
        comment: String,
        date: Date,
        email: String,
        approved: { type: Boolean, default: false, required: true },
      },
    ],
    feature: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
