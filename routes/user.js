const express = require("express");
const router = express.Router();
const { handleSignUp, handleLogin } = require("../controllers/user");

const {
  handleUserView,
  handleSignUpView,
  handleLoginView,
} = require("../controllers/staticRouter");

router.get("/", handleUserView);
router.get("/signup", handleSignUpView);
router.get("/login", handleLoginView);

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);

module.exports = router;
