const { Router } = require("express");
//const express = require("express");

const router = Router();
//express.Router();

//GET All Users
router.get("/", (req, res) => {
  users = [
    { id: 1, username: "jex", password: "123" },
    { id: 2, username: "vanne", password: "342" },
    { id: 3, username: "diego", password: "062" },
  ];
  res.json(users);
});

//Get One User
router.get("/:userid", (req, res) => {
  const data = users.find((user) => {
    return user.id == req.params.userid;
  });

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

//Post One User (create)
router.post("/", (req, res) => {
  const data = req.body;
  const { username, email } = data;
  const newUser = { username, email, id: 54 };

  if (!data) {
    res.status(400).json({ message: "User data is required" });
  } else {
    res.status(201).json({
      ok: true,
      message: "User was created",
      payload: newUser,
    });
  }
});

//Put One User (update)

//Delete One User

module.exports = router;
