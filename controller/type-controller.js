import { BAD_REQUEST } from "constants/api";
import Type from "models/type_object";

export async function getAllTypesController(req, res) {
  try {
    const types = await Type.findAll();
    res.status(200).json(success(types));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function getTypeController(req, res) {
  try {
    const { id } = req.params;
    const type = await Type.findOne({
      where: { id }
    });
    res.status(200).json(success(type));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}