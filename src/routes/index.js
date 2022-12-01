const usersRouter = require("./users");
const todosRouter = require("./todos");
const categoriesRouter = require("./categories");

const apiRouter = (app) => {
  app.use("/users", usersRouter);
  //app.use("/categories", categoriesRouter);
  //app.use("/todos", todosRouter);
};

module.exports = apiRouter;
