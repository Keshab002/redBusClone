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

  if (!scheduleDate) {
    return buses.filter(
      (bus) =>
        bus.fromLocationName === fromLocationName &&
        bus.toLocationName === toLocationName
    );
  }

  return buses.filter((bus) => {
    return (
      bus.fromLocationName === fromLocationName &&
      bus.toLocationName === toLocationName &&
      formatYYYYMMDD(new Date(bus.arrivalTime)) ===
        formatYYYYMMDD(new Date(scheduleDate))
    );
  });
};

getSpecificBusSrv = async (scheduldeId) => {
  const buses = await busModel.getSearchBusModel();
  return buses.find((bus) => bus.scheduleId === Number(scheduldeId));
};

getBookedSeatsSrv = async (scheduleId) => {
  const buses = await busModel.getSearchBusModel();
  const bus = buses.find((bus) => bus.scheduleId === Number(scheduleId));
  // Placeholder logic for booked seats
  return bus ? bus.bookedSeats || [] : [];
};

postBookedSeatsSrv = async (obj) => {
  const buses = await busModel.getSearchBusModel();

  const busIndex = buses.findIndex(
    (bus) => bus.scheduleId === Number(obj.scheduleId)
  );

  if (busIndex === -1) {
    throw new Error("Bus not found");
  }

  const bus = buses[busIndex];

  // Extract seats from request and remove null/undefined
  const seatToBook = obj.BusBookingPassengers
    .map(p => p.seatNo)
    .filter(s => s !== null && s !== undefined);

  // Merge existing + new, but remove duplicates
  const updatedBookedSeats = Array.from(
    new Set([...(bus.bookedSeats || []), ...seatToBook])
  );

  bus.bookedSeats = updatedBookedSeats;

  const updatedBusDetails = await busModel.postBookedSeatsModel(bus);
  await busModel.saveBookedPassengersModel(obj);

  return updatedBusDetails;
}

module.exports = {
  getBusLocationSrv,
  getSearchBusSrv,
  getSpecificBusSrv,
  getBookedSeatsSrv,
  postBookedSeatsSrv
};
