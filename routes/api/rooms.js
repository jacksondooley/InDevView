const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createRoom } = require("../../controllers/rooms_controller");

router.get("/test", (req, res) => res.json({ msg: "This is the rooms route"}));
router.post('/create', passport.authenticate("jwt", {session: false}), createRoom);
// router.get("/:room_key", passport.authenticate("jwt", {session: false}), fetchRoom);

module.exports = router;