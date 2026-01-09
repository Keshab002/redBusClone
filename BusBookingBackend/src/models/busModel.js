// model interacts with the JSON file (acts like database)

const { readJSON, writeJSON } = require("../utils/fileHelper");
const busfilePath = "./src/data/buses.json";
const searchBusFilePath = "./src/data/searchBus.json";
const passengerDetailsFilePath = "./src/data/bookedPassengerDetails.json";

getAllBusLocationsModel = async () => {
  return await readJSON(busfilePath);
};

getSearchBusModel = async () => {
  return await readJSON(searchBusFilePath);
};

postBookedSeatsModel = async (obj) => {
  // Placeholder logic for booked seats
  let buses = await readJSON(searchBusFilePath);
  const busIndex = buses.findIndex(
    (bus) => bus.scheduleId === Number(obj.scheduleId)
  );
  if (busIndex === -1) {
    throw new Error("Bus not found");
  }
  buses[busIndex] = obj;
  // In a real application, here we would update the database or JSON file
  await writeJSON(searchBusFilePath, buses);
  return obj;
};

saveBookedPassengersModel = async (obj) => {
  let BookedPassengerDetails = [];
  try {
    BookedPassengerDetails = await readJSON(passengerDetailsFilePath);
  } catch (error) {
    // If file doesn't exist, start with an empty array
    BookedPassengerDetails = [];
  }
  BookedPassengerDetails.push(obj);
  await writeJSON(passengerDetailsFilePath, BookedPassengerDetails);
  return obj;
};

module.exports = {
  getAllBusLocationsModel,
  getSearchBusModel,
  postBookedSeatsModel,
  saveBookedPassengersModel
};
