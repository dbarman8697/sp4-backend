const express = require("express");
const { PostModel } = require("../models/Post.model");

const postRouter = express.Router();

//Create Post

postRouter.post("/add", async (req, res) => {
  try {
    const post = PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "Post Added!!" });
  } catch (error) {
    res.statusCode(400).send({ error: error.message });
  }
});

// {
//  "title": "heelo",
//  "body": "hello",
//  "device": "Tablet",
//  "no_of_comments": 2
// }

//Get Post
postRouter.get("/", async (req, res) => {
  try {
    const { device, device1 } = req.query;
    const query = { userId: req.body.userId };
    if (device) {
      query.device = device;
    }
    if (device1) {
      query.$and = [{ device: device }, { device: device }];
    }

    const post = await PostModel.find(query);
    res.status(200).send({ msg: "All Posts!!", post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//update Post
postRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Post Updated!!", updatePost });
  } catch (error) {
    res.status(400).send({ error: error.messagef });
  }
});

//Delete Post
postRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Post Deleted!!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { postRouter };
