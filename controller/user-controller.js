import { BAD_REQUEST } from "constants/api";
import User from "models/user";

export async function getAllUsersController(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(success(users));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function getUserProfileController(req, res) {
  try {
    const { uuid } = req.params;

    const user = await User.findOne({
      where: { uuid }
    });
    res.status(200).json(success(user));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

export async function updateUserProfileController(req, res) {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid }
    });

    if (user) {
      const fields = pick(req.body, [
        "password",
        "password_confirmation",
        "username",
        "email"
      ]);

      await user.update(fields);
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

export async function deleteUserProfileController(req, res) {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid }
    });

    if (user) {
      try {
        let _ = await User.destroy({
          where: { uuid }
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
