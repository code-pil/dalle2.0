const express = require("express");
const AuthSchema = require("../db/models/auth.js");
const { hash } = require("bcrypt");
const dotenv = require("dotenv");
const { isValidText, isValidEmail } = require("../utils/validation.js");
const {
  isValidPassword,
  createJSONToken,
} = require("../utils/authentication.js");

dotenv.config();

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const { name, email, password } = req.body;
  let errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Invalid email";
  } else {
    try {
      const foundUser = await AuthSchema.findOne({ email: email });

      if (foundUser) {
        errors.email = "Email exists already.";
      }
    } catch (error) {}
  }
  //validators - email, password
  if (!isValidText(password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  const pwHash = await hash(password, 10);

  const createdUser = await AuthSchema.create({
    name: name,
    email: email,
    passwordHash: pwHash,
  });

  const authToken = createJSONToken(email);

  res.status(201).json({
    message: "Signup successful",
    user: createdUser,
    token: authToken,
    name: name,
  });
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthSchema.findOne({ email: email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Authentication failed, user does not exists" });
  }

  const pwIsValid = await isValidPassword(password, user.passwordHash);

  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid Credintials.",
      errors: { credential: "Invalid email or password." },
    });
  }

  const token = createJSONToken(email);
  const name = user.name;
  res.json({ token, name });
});

module.exports = router;
