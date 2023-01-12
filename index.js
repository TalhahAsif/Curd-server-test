const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./Modals/UserSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const router = require("./Routes/route");

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URI =
  "mongodb+srv://TalhaAsif:qWCP9tOlTA9W6pFO@learing.vxv2gkc.mongodb.net/CurdApp";

require("dotenv").config();

mongoose
  .connect(BASE_URI)
  .then((res) => console.log("Mongo DB Connected"))
  .catch((err) => console.log("not connected"));

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`This server is running on http://localhost:${PORT} `);
});
