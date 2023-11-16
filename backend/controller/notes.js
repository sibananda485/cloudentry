const Notes = require("../models/Notes");
const User = require("../models/User");

const handleGetAllNotes = async (req, res) => {
  const user = await User.findById(req.payload.id);
  const result = await Notes.find({ user: req.payload.id });

  res.status(200).json({ user, notes: result });
};

const addNotes = async (req, res) => {
  try {
    const result = await Notes.create({ ...req.body, user: req.payload.id });
    res.status(201).json({ message: "Note Added Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNotes = async (req, res) => {
  try {
    const oldData = await Notes.findOne({ _id: req.params.id });
    if (oldData?.user && req.payload.id == oldData.user) {
      const result = await Notes.findByIdAndUpdate(req.params.id, {
        ...oldData._doc,
        ...req.body,
      });
      res.status(200).json({ message: "Note Updated Successfully" });
    } else {
      res.status(404).json({ err: "Notes not availabe for this user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const oldData = await Notes.findOne({ _id: req.params.id });
    if (oldData?.user && req.payload.id == oldData.user) {
      const result = await Notes.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Note Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Notes not availabe for this user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleGetAllNotes, addNotes, updateNotes, deleteNotes };
