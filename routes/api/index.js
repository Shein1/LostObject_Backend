import { Router } from "express";
import passport from 'passport'

import auth from "./auth";
import secured from "./secured";

const api = Router();

api.get("/", (req, res) => {
  res.json({
    api: "LostObject",
    meta: {
      status: "running",
      version: "v1.0"
    }
  });
});

api.use("/auth", auth);
api.use("/", passport.authenticate('jwt', { session: false }), secured);


export default api;
