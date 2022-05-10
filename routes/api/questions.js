const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createQuestion, fetchQuestions } = require("../../controllers/questions_controller");

router.get("/test", (req, res) => res.json({ msg: "This is the questions route"}));
router.post('/create', passport.authenticate("jwt", {session: false}), createQuestion);
// router.get("/:room_key", passport.authenticate("jwt", {session: false}), fetchRoom);

router.get("/all", fetchQuestions)

module.exports = router;