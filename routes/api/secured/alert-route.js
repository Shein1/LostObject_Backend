import { Router } from "express";
import {
    getAllAlertController,
    addAlertController,
    getAllAlertsByUserController,
    getAlertByIdController,
    updateAlertController,
    deleteAlertController
} from "controllers/alert-controller";

const api = Router();

api.get("/", getAllAlertController);
api.post("/", addAlertController);
api.get("/", getAllAlertsByUserController);
api.get("/:id", getAlertByIdController);
api.put("/:id", updateAlertController);
api.delete("/:id", deleteAlertController);


export default api;
