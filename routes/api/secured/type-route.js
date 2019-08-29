import { Router } from "express";
import {
    getAllTypesController,
    getTypeController,
} from "controllers/type-controller";

const api = Router();

api.get("/", getAllTypesController);
api.post("/:id", getTypeController);

export default api;
