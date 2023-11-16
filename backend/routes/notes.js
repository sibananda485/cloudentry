const express = require("express");
const getUserDetails = require("../middleware/getUserFromToken");
const {
  handleGetAllNotes,
  addNotes,
  updateNotes,
  deleteNotes,
} = require("../controller/notes");
const router = express.Router();

router.get("/allnotes", getUserDetails, handleGetAllNotes);
router.post("/setnotes", getUserDetails, addNotes);
router.patch("/updatenote/:id", getUserDetails, updateNotes);
router.delete("/deletenote/:id", getUserDetails, deleteNotes);

module.exports = router;
 