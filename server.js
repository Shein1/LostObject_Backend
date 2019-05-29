import express from "express";
import bodyParser from "body-parser";
import { PORT } from "@env";
import User from "models/user";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import { db as database } from "models";

(async () => {
  try {
    await database.authenticate();

    app.get("/v1", (req, res) =>
      res.status(200).send({
        message: "Welcome to this API."
      })
    );

    app.get("/v1/users", async (req, res) => {
      try {
        const user = await User.findAll();

        if (user.length != 0) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ BAD_REQUEST: `Oops, user doesn't exist` });
        }
      } catch (err) {
        /* istanbul ignore next */
        res.status(400).json(err.message);
      }
    });

    app.use((req, res) => {
      res.status(404).json({
        Error: "Routes not found"
      });
    });

    app.use((err, req, res) => {
      /* istanbul ignore next */
      res.status(err.status || 500).json({ err: err.message });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (err) {
    /* istanbul ignore next */
    process.exit(42);
  }
})();

export default app;
