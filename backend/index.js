const express = require("express");
const dbConnection = require("./db");
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");
const adminRoute = require("./routes/adminRoute");
const cors = require("cors");
const uri =
  "mongodb+srv://sahusiba485:Sibananda%40485@cluster0.etxvfcl.mongodb.net/cloudentry?retryWrites=true&w=majority";

const PORT = 5000;

const app = express();
app.use(cors())

dbConnection(uri);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii from vercel");
});
app.use("/api/auth", authRoute); //To manipulate User Schema
app.use("/api/notes", notesRoute); //To manipulate Notes Schema
app.use("/admin",adminRoute)

app.listen(PORT, () => {
  console.log("Server started");
});
