const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/expresss-tut", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes

// Get all users

// Create a new user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body.first_name || !body.last_name || !body.email) {
    return res.status(400).send("All fields are required!");
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", data: result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
