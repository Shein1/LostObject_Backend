import { Router } from "express";
import {
    getAllStationController,
    getStationController,
} from "controllers/station-controller";

const api = Router();

api.get("/", getAllStationController);
api.post("/:id", getStationController);

export default api;
