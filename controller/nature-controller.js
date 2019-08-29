import { BAD_REQUEST } from "constants/api";
import Nature from "models/nature_object";

export async function getAllNaturesController(req, res) {
  try {
    const natures = await Nature.findAll();
    res.status(200).json(success(natures));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function getNatureController(req, res) {
  try {
    const { id } = req.params;
    const nature = await Nature.findOne({
      where: { id }
    });
    res.status(200).json(success(nature));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}