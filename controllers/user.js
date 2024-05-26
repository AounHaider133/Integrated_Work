const User = require("../models/user");

async function handleSignUp(req, res) {
  const user = req.body;
  if (!user) {
    return res.render("sign-up", {
      message: "Fill all the required fields",
    });
  }
  if (user.password != user.confirmPassword) {
    return res.render("sign-up", {
      message: "password do not match",
    });
  }

  await User.create(user);
  return res.redirect("/user/sign-in");
}

async function handleLogin(req, res) {
  const body = req.body;
  if (!body.username || !body.password) {
    return res.status(400).json({
      message: "Fill all the required fields",
    });
  }
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (!user) {
    return res.render("login", {
      message: "Invalid credentials",
    });
  }

  return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleLogin,
};
