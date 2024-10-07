require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./config.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

require("./app/route/user.route.js")(app);
require("./app/route/event.route.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Using PORT: " + PORT);
});
