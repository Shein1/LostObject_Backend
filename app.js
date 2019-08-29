import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import passport from "passport"
import "./middleware/passport"
import api from 'routes/api'

import { db as database } from "./models";
const app = express();
const log = console.log;

// IIFE for database init
(async () => {
  await database.authenticate();
  log("Connected to SQL database!");
  // creates tables from models
  database.sync({
    force: true,
    logging(str) {
      log(str);
    }
  });
})();

app.use(passport.initialize());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    limit: "10000mb",
    extended: true,
    parameterLimit: 1000000000000000
  })
);

app.use((req, res, next) => {
  res.setHeader("Accept", "application/x-www-form-urlencoded");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Accept, Authorization, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/v1", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API of lostObject."
  })
);

app.use("/api", api);

app.use((req, res) => {
  res.status(404).json({
    Error: "Routes not found"
  });
});

app.use((err, req, res) => {
  /* istanbul ignore next */
  res.status(err.status || 500).json({ err: err.message });
});

export default app;
