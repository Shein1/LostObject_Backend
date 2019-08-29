import { BAD_REQUEST } from "constants/api";
import Station from "models/station";

export async function getAllStationController(req, res) {
  try {
    const stations = await Station.findAll();
    res.status(200).json(success(stations));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function getStationController(req, res) {
  try {
    const { id } = req.params;
    const station = await Station.findOne({
      where: { id }
    });
    res.status(200).json(success(station));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}