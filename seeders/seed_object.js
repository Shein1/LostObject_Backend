import { db } from "models";
import { URL_FO } from "@env";

import axios from "axios";
import colors from "colors/safe";

import FoundObject from "models/found_object";
import Type from "models/type_object";
import Nature from "models/nature_object";
import Station from "models/station";

/**
  @ Init of table lostObject with sncf api
**/

db.sync()
  .then(async () => {
    axios.get(`${URL_FO}`).then(async response => {
        try {
          let data = response.data.records;
          let reversedData = data.reverse();

          for (let i = 0; i < reversedData.length; i++) {
            const {
              gc_obo_gare_origine_r_name,
              gc_obo_gare_origine_r_code_uic_c,
              gc_obo_type_c,
              gc_obo_nature_c,
              date,
              gc_obo_date_heure_restitution_c
            } = reversedData[i].fields;
            const stationName = gc_obo_gare_origine_r_name;
            const type = gc_obo_type_c;
            const uic = gc_obo_gare_origine_r_code_uic_c;
            const nature = gc_obo_nature_c;
            const retDate = gc_obo_date_heure_restitution_c;
            if (!retDate) {
              // Check if station already exist in Station table where stationName is the station name that we get from API
              // If not, we create a new station with the name we get and save it in the table
              let station = await Station.findOne({
                attributes: ["id"],
                where: {
                  name: stationName,
                  uic_code: uic
                }
              });
              if (!station) {
                station = new Station({
                  name: stationName,
                  uic_code: uic
                });
                await station.save();
              }
              const { id: sid } = station.dataValues;
              // Check if objectType already exist in TypeObject table where typeObject is the type that we get from API
              // If not, we create a new typeobject with the name we get and save it in the table
              let objectType = await Type.findOne({
                attributes: ["id"],
                where: {
                  type
                }
              });
              if (!objectType) {
                objectType = new Type({
                  type
                });
                await objectType.save();
              }
              const { id: tid } = objectType.dataValues;
              // Check if objectNature already exist in NatureObject table where natureObject is the nature that we get from API
              // If not, we create a new objectNature with the name we get and save it in the table
              let objectNature = await Nature.findOne({
                attributes: ["id"],
                where: {
                  nature
                }
              });
              if (!objectNature) {
                objectNature = new Nature({
                  nature,
                  typeId: objectType.dataValues.id
                });
                await objectNature.save();
              }
              const { id: nid } = objectNature.dataValues;
              // We create a new FoundObject and save it in the table FoundObject
              let obj = new FoundObject({
                  typeId: tid,
                  natureId: nid,
                  stationId: sid,
                  date
              });
              // Check if the object already exists on table, if not, we save the new object
              let existingObject = await FoundObject.findOne({
                attributes: ["id"],
                where: {
                  typeId: tid,
                  natureId: nid,
                  stationId: sid,
                  date
                }
              });
              if (!existingObject) {
                await obj.save();
              }
            }
          }
        } catch (err) {
          console.log(err.message);
        }
    });
  })

  .catch(err => {
    console.log(colors.red(`Unable to connect to SQL database: ${err}`));
    process.exit(42);
  });
