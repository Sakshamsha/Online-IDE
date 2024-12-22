const express = require("express");
const { signUp, login, getUserDetails} = require("../controllers/user"); // Ensure this path is correct
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/getUserDetails", getUserDetails);


module.exports = router;