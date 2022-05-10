const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createRoom, fetchRoom, addParticipant } = require("../../controllers/rooms_controller");

// router.get("/:room_key", (req, res) => res.json({ msg: "This is the rooms route"}));
router.post('/create', passport.authenticate("jwt", {session: false}), createRoom);
router.get("/:room_key", passport.authenticate("jwt", {session: false}), fetchRoom);
router.patch("/:room_key/join", passport.authenticate("jwt", {session: false}), addParticipant);

module.exports = router;
