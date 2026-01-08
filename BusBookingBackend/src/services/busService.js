// service contains all the business logic

const busModel = require("../models/busModel");
const { formatYYYYMMDD } = require("../utils/dateUtils");

getBusLocationSrv = async () => {
  return busModel.getAllBusLocationsModel();
};

getSearchBusSrv = async (fromLocationId, toLocationId, scheduleDate) => {
  const locations = await busModel.getAllBusLocationsModel();
  const buses = await busModel.getSearchBusModel();

  const { locationName: fromLocationName } = locations.find(
    (loc) => loc.locationId === Number(fromLocationId)
  );

  const { locationName: toLocationName } = locations.find(
    (loc) => loc.locationId === Number(toLocationId)
  );

  return buses.filter(
    (bus) =>
      bus.fromLocationName === fromLocationName &&
      bus.toLocationName === toLocationName &&
      formatYYYYMMDD(new Date(bus.scheduleDate)) ===
        formatYYYYMMDD(new Date(scheduleDate))
  );
};

getSpecificBusSrv = async (scheduldeId) => {
  const buses = await busModel.getSearchBusModel();
  return buses.find((bus) => bus.scheduleId === Number(scheduldeId));
};

getBookedSeatsSrv = async (scheduleId) => {
  const buses = await busModel.getSearchBusModel();
  const bus = buses.find((bus) => bus.scheduleId === Number(scheduleId));
  console.log(bus);
  // Placeholder logic for booked seats
  return bus ? bus.bookedSeats || [] : [];
};

module.exports = {
  getBusLocationSrv,
  getSearchBusSrv,
  getSpecificBusSrv,
  getBookedSeatsSrv,
};
