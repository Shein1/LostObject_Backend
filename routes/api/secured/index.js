import { Router } from "express";

import user from "./user-route";
import nature from "./nature-route";
import object from "./object-route";
import type from "./type-route";
import station from "./station-route";
import alert from "./alert-route";

const api = Router({ mergeParams: true });

api.use("/users", user);
api.use("/types", type);
api.use("/natures", nature);
api.use("/objects", object);
api.use("/alerts", alert);
api.use("/stations", station);

export default api;
