const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = new User({ fullName, email, password });
    await user.save();
    return res.status(200).json({
      message: "User saved successfully",
      user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const verifyUser = await bcrypt.compare(password, user.password);
      if (verifyUser) {
        const payload = {
          user: {
            id: user._id,
          },
        };

        const token = jwt.sign(payload, "siliconMERNCourse", {
          expiresIn: 3600,
        });
        res.status(200).json({
          message: "Logged in",
          user: { user_id: user._id, email: user.email },
          token,
        });
      } else {
        res.status(401).json({
          message: "Wrong Username/Password",
        });
      }
    } else {
      res.status(401).json({
        message: "Not registered",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = router;
