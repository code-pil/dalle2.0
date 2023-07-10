const express = require("express");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const { checkAuthMiddleware } = require("../utils/authentication");
const { isValidText } = require("../utils/validation");

dotenv.config();
const router = express.Router();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => {
  res.send("Hello From Dalle Routes");
});

router.use(checkAuthMiddleware);

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;

  let errors = {};

  if (!isValidText(prompt)) {
    errors.prompt = "Invalid prompt";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Creation failed due to invalid prompt.",
      errors,
    });
  }

  try {
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(500).json(error?.response.data.error.message);
  }
});

module.exports = router;
