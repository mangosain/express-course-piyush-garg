const express = require("express");
const users = require("./MOCK_DATA.json");

const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes

// Get all users
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Common route for multiple requests
app
  .route("/api/users/:id")
  .get((req, res) => {
    // Get user by id
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id));

    return res.json(user);
  })
  .patch((req, res) => {
    // Update user by id
    const { id } = req.params;
    return res.json({ message: `User ${id} updated` });
  })
  .delete((req, res) => {
    // Delete user by id
  });

app.post("/api/users/", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.json({ message: "Error" });
    }
    return res.json({
      message: "User added successfully",
      data: { id: users.length, ...body },
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
