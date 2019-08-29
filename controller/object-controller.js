import { BAD_REQUEST } from "constants/api";
import FoundObject from "models/found_object";
import Type from "models/type_object";
import Nature from "models/nature_object";
import Station from "models/station";

export async function getFoundObjectByIdController(req, res) {
  try {
    const { id } = req.params;
    const fObject = await FoundObject.findOne({
      where: { id },
      attributes: ["id", "date", "type_id", "station_id", "nature_id"]
    });

    let station = await Station.findOne({
        attributes: ['station_name'],
        where: {
            uic_code: sid
        }
    });

    let type = await Type.findOne({
        attributes: ['type'],
        where: {
            id: tid
        }
    });

    let nature = await Nature.findOne({
        attributes: ['nature'],
        where: {
            id: nid
        }
    });

    res.status(200).json(success({fObject, information: {
        station,
        type,
        nature
    }}));
  } catch (error) {
    res.status(400).json(error(BAD_REQUEST, error.message));
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export async function getAllFoundObjectController(req, res) {
  try {
    let { sid, tid, nid } = req.query;
    let { page } = req.params;
    let pageNb;

    let limit = 15;
    let offset = limit * (page - 1);

    const fObjects = await FoundObject.findAll({
      attributes: ["id", "date", "type_id", "station_id", "nature_id"],
      where: {
        station_id: sid ? sid : { [Op.ne]: null },
        type_object: tid ? tid : { [Op.ne]: null },
        nature_id: nid ? nid : { [Op.ne]: null }
      },
      order: [["id", "asc"]],
      limit: limit,
      offset: offset
    });

    let countedFObject = Object.keys(fObjects).length;

    if (countedFObject < 15) {
      pageNb = 1;
    } else if (countedFObject > 15 && countedFObject % limit != 0) {
      pageNb = parseInt(countedFObject / limit) + 1;
    } else {
      pageNb = countedFObject / limit;
    }

    if (isEmpty(req.query)) {
      res.status(200).json(
        success({
          fObjects,
          information: {
            pages: pageNb,
            objects: countedFObject
          }
        })
      );
    } else {
      const qp = ["sid", "tid", "nid"];
      let wrongQuery = false;
      for (let params in req.query) {
        if (qp.indexOf(params) === -1) {
          wrongQuery = true;
        }
      }
      if (wrongQuery) {
        res.json(error(BAD_REQUEST, { Error: "Your query is wrong typed " }));
      } else {
        if (fObjects == 0) {
          res
            .status(400)
            .json(
              error({ Error: "There is no object found with your criteria" })
            );
        } else {
          if (pageNb == 1) {
            res.status(200).json({
              found_object,
              information: {
                page: pageNb,
                objects: countedFObject
              }
            });
          } else {
            res.status(200).json({
              found_object,
              information: {
                pages: pageNb,
                objects: countedFObject
              }
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json(error(BAD_REQUEST, error.message));
  }
}
