const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { validateUser } = require("../validation/users");''

// Create a user
router.post("/signup", async (req, res) => {
  try {
    const { error, value } = validateUser(req.body);
    console.log("error, value", error, value);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ user });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
});

module.exports = router;
