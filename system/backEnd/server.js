import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import config from "./src/services/config";
import routes from "./src/routes";

// mongose conection
mongoose
  .connect(`mongodb://${config.urlmongodb}${config.namedb}`, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(db => console.log("conect MongoDB..."))
  .catch(err => console.log(`No conecto por: ${err}`));

//aplication server
const app = express();

// integracion libs

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);
app.use(morgan("dev"));
app.use(cors());
if (config.mode !== "test") {
  app.listen(config.port, () => {
    console.log(`onectando con el puerto ${config.port} `);
  });
} 
module.exports = app;
