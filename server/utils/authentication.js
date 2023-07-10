const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { NotAuthError } = require("./errors");

function createJSONToken(email) {
  return sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, process.env.JWT_SECRET);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}

module.exports = {
  createJSONToken,
  validateJSONToken,
  isValidPassword,
  checkAuthMiddleware,
};
