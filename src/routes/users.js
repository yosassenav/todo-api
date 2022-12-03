const { Router } = require("express");
const fs = require("fs/promises");
//const express = require("express");

const router = Router();
//express.Router();

//GET All Users
router.get("/", async (req, res) => {
  const fileContent = (await fs.readFile("./usersdummy.json")).toString();
  const users = JSON.parse(fileContent);

  res.json(users);
});

//Get One User
router.get("/:userid", async (req, res) => {
  const fileContent = (await fs.readFile("./usersdummy.json")).toString();
  const users = JSON.parse(fileContent);

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
router.post("/", async (req, res) => {
  const data = req.body;

  const { username, email, id } = data;
  const newUser = { username, email, id };

  const fileContent = (await fs.readFile("./usersdummy.json")).toString();
  const users = JSON.parse(fileContent);
  users.push(newUser);

  await fs.writeFile("./usersdummy.json", JSON.stringify(users));

  if (!data) {
    res.status(404).json({ message: "User data is required" });
  } else {
    res.status(201).json({
      ok: true,
      message: "User was created",
      payload: newUser,
    });
  }
});

//Put One User (update)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  console.log(id);

  const fileContent = (await fs.readFile("./usersdummy.json")).toString();
  const users = JSON.parse(fileContent);
  console.log("users: ", users);

  const user = users.find((item) => {
    return item.id == id;
  });

  const newUsers = users.filter((item) => {
    return id != item.id;
  });
  console.log("user: ", user);
  user.username = username;

  newUsers.push(user);

  console.log(newUsers);
  await fs.writeFile("./usersdummy.json", JSON.stringify(newUsers));

  res.json({ ok: true, payload: user });
});

//Delete One User

module.exports = router;
