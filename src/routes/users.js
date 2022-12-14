const { Router } = require("express");
const fs = require("fs/promises");
const usersUseCases = require("../usecases/user");
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
  const { name, password } = req.body;

  try {
    const payload = await usersUseCases.create(name, password);
    res.json({ ok: true, message: "User was created successfully!", payload });
  } catch (error) {
    res.status(400).json({ ok: false, message: error });
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
  //object.property    username <---- body of request
  user.username = username;

  newUsers.push(user);

  console.log(newUsers);
  await fs.writeFile("./usersdummy.json", JSON.stringify(newUsers));

  res.json({ ok: true, payload: user });
});

//Delete One User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const fileContent = (await fs.readFile("./usersdummy.json")).toString();
  const users = JSON.parse(fileContent);

  const usersUpdatedList = users.filter((user) => user.id != id);
  console.log(usersUpdatedList);

  //console.log(users);
  try {
    await fs.writeFile("./usersdummy.json", JSON.stringify(usersUpdatedList));
  } catch (error) {
    console.log(error);
  }
  res.json({
    ok: true,
    message: "User was deleted successfully",
    payload: usersUpdatedList,
  });
});

module.exports = router;
