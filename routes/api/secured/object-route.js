import { Router } from "express";
import {
    getFoundObjectByIdController,
    getAllFoundObjectController,
} from "controllers/object-controller";

const api = Router();

api.get("/:id", getFoundObjectByIdController);
api.post("/page/:page", getAllFoundObjectController);

export default api;
