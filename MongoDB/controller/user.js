const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find();
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    return res.json(user);
  }
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({
    message: "User updated successfully",
  });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    message: "User deleted successfully",
  });
}

async function handleCreateUser(req, res) {
  const body = req.body;
  // Check for required fields
  if (!body.firstName || !body.lastName || !body.email) {
    return res.status(400).send("All fields are required!");
  }

  // Create a new user with correct field names
  try {
    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", id: result._id });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create user" });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
};
