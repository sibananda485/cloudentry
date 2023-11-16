const express = require("express");
const router = express.Router();
const {handleAdminAllNotes,handleAdminAllUser} = require("../controller/admin")

router.get("/",handleAdminAllUser)
router.get("/:id",handleAdminAllNotes)

module.exports = router;