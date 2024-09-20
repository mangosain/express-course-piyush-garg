const express = require("express");

const { connectMongoDB } = require("./connection");

const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectMongoDB("mongodb://localhost:27017/test");

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
