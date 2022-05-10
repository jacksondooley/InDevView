const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createQuestion, fetchAllQuestions, fetchQuestion, destroyQuestion } = require("../../controllers/questions_controller");

router.post('/create', passport.authenticate("jwt", {session: false}), createQuestion);
router.get("/all", fetchAllQuestions)
router.get("/get", fetchQuestion)
router.delete('/destroy', passport.authenticate("jwt", {session: false}), destroyQuestion);

module.exports = router;

