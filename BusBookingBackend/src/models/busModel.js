// model interacts with the JSON file (acts like database)

const { readJSON } = require("../utils/fileHelper");
const busfilePath = "./src/data/buses.json";
const searchBusFilePath = "./src/data/searchBus.json";

getAllBusLocationsModel = async () => {
  return await readJSON(busfilePath);
};

getSearchBusModel = async () => {
  return await readJSON(searchBusFilePath);
};

module.exports = {
  getAllBusLocationsModel,
  getSearchBusModel,
};
