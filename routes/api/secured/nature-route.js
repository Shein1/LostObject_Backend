import { Router } from "express";
import {
    getAllNaturesController,
    getNatureController,
} from "controllers/nature-controller";

const api = Router();

api.get("/", getAllNaturesController);
api.post("/:id", getNatureController);

export default api;
