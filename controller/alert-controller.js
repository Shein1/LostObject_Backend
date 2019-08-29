import { BAD_REQUEST } from "constants/api";
import Alert from "models/alert";

export async function getAllAlertController(req, res) {
  try {
    const alerts = await Alert.findAll();
    res.status(200).json(success(alerts));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function addAlertController(req, res) {
  try {
    const { userId: uuid, sId, tId, nId } = req.body;
    let alert = new Alert({
      user_id: uuid,
      station_id: sId,
      type_id: tId ? tId : { [Op.ne]: null },
      nature_id: nId ? nId : { [Op.ne]: null }
    });
    await alert.save();
    return res.status(201).json(success({ alert }));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function getAllAlertsByUserController(req, res) {
  try {
    const { userId: user_id } = req.body;
    let alerts = Alert.findAll({
      where: { user_id }
    });
    return res.status(200).json(success({ alerts }));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function getAlertByIdController(req, res) {
  try {
    const { id } = req.params;
    let alert = Alert.findOne({
      where: { id }
    });
    return res.status(200).json(success({ alert }));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function updateAlertController(req, res) {
  try {
    const { id } = req.params;
    const alert = await Alert.findOne({
      where: { id }
    });

    if (alert) {
      const fields = pick(req.body, ["station_id", "type_id", "nature_id"]);

      await alert.update(fields);
      return res.status(200).json(success({ user }));
    } else {
      res
        .status(400)
        .json({ title: "There is an unexpected error", detail: err.message });
    }
  } catch (error) {
    res.status(500).json(error(BAD_REQUEST, error));
  }
}

export async function deleteAlertController(req, res) {
  try {
    const { id } = req.params;
    const alert = await Alert.findOne({
      where: { id }
    });

    if (alert) {
      try {
        let _ = await Alert.destroy({
          where: { id }
        });
        res.status(204);
      } catch (err) {
        res.status(400).json(error(BAD_REQUEST, err.message));
      }
    }
  } catch (err) {
    res.status(500).json(error(BAD_REQUEST, err.message));
  }
}
