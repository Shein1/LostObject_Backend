import { Router } from "express";
import {
    getAllUsersController,
    getUserProfileController,
    updateUserProfileController,
    deleteUserProfileController
} from "controllers/user-controller";

const api = Router();

api.get("/", getAllUsersController);
api.get("/:uuid", getUserProfileController);
api.put("/:uuid", updateUserProfileController);
api.delete("/:uuid", deleteUserProfileController);

export default api;
