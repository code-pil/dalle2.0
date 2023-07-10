const express = require("express");
const dotenv = require("dotenv");
const { v2 } = require("cloudinary");
const cloudinary = v2;

const Post = require("../db/models/post.js");
const { checkAuthMiddleware } = require("../utils/authentication.js");
const { isValidText } = require("../utils/validation.js");

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.use(checkAuthMiddleware);

//create a post
router.route("/").post(async (req, res) => {
  const { name, prompt, photo } = req.body;
  let errors = {};

  if (!isValidText(name)) {
    errors.name = "Invalid name";
  }

  if (!isValidText(prompt)) {
    errors.prompt = "Invalid prompt";
  }

  if (Object.keys(errors).length > 0) {
    return res
      .status(422)
      .json({
        message: "Post creation failed due to validation errors.",
        errors,
      });
  }

  try {
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
