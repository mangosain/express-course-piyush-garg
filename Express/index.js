const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Home Page");
});

app.get("/about", (req, res) => {
  return res.send(`About Page. Hello ${req.query.name}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
