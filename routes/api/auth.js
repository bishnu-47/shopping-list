import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";
import express from "express";
const router = express.Router();

// @route   POST /api/auth/register
// @desc   register an user
// @access   public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check all data is recived
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Provide all credentials" });

    // check if password length > 8
    if (password.length < 8)
      return res.status(400).json({
        msg: "password length should be greater than or equal 8 characters",
      });

    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // create new user
    const newUser = new User({ name, email, password });

    // generate salt and hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        await newUser.save();
      });
    });

    // create a jwt token and attach it to response
    jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
          msg: "Registration Successful.",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST /api/auth/login
// @desc   login an user
// @access   public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check all data is recived
    if (!email || !password)
      return res.status(400).json({ msg: "Provide all credentials" });

    // check for user dosen't exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials!" });

    // compare the given pwd with hashed pwd
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) throw error;

      if (isMatch === false)
        // if hashed pwd dosen't match
        return res.status(400).json({ msg: "Invalid Credentials!" });
    });

    // if hashed pwd matches
    // create a jwt token and attach it to response
    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        return res.status(200).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          msg: "Logged In.",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

export default router;
