const express = require("express");
const app = express();
const apiRouter = require("./src/routes");
const { logErrors, errorHandler } = require("./src/middlewares/errorHandler");
const config = require("./src/lib/config");
const db = require("./src/lib/db");

//app.use(express.json())
apiRouter(app);
app.use(logErrors);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "El API ya no funciona" });
});

app.listen(config.app.port, async () => {
  console.log(`Escuchando peticiones HTTP en el puerto ${config.app.port}`);
  try {
    await db.connect();
    console.log("DB is connected :D");
  } catch (error) {
    console.error("Connection refused: ", error);
  }
});
