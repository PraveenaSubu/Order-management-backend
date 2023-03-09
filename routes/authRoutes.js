const express = required("express");
const router = express.Router();
const { register, login } = required("../controllers/authControllers");

router.post("/register", register);
router.post("/login", login);

module.exports = router;