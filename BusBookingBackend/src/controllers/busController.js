// controller handles request and response
const {
  getBusLocationSrv,
  getSearchBusSrv,
  getSpecificBusSrv,
  getBookedSeatsSrv,
  postBookedSeatsSrv,
} = require("../services/busService");

getBusLocationsController = async (req, res) => {
  const buses = await getBusLocationSrv();
  res.status(200).json({ message: "success", data: [...buses] });
};

getSearchBusController = async (req, res) => {
  const { fromLocationId, toLocationId, scheduleDate } = req.query;

  const availableBuses = await getSearchBusSrv(
    fromLocationId,
    toLocationId,
    scheduleDate
  );
  res.status(200).json({ message: "success", data: [...availableBuses] });
};

getSpecificBusController = async (req, res) => {
  const { scheduleId } = req.query;
  const specificBus = await getSpecificBusSrv(scheduleId);
  res.status(200).json({ message: "success", data: specificBus });
};

getBookedSeatsController = async (req, res) => {
  const { scheduleId } = req.query;
  // Placeholder logic for booked seats
  const bookedSeats = await getBookedSeatsSrv(scheduleId);
  res.status(200).json({ message: "success", data: bookedSeats });
};

postBookedSeatsController = async (req, res) => {
  // Placeholder logic for booked seats
  const bookedSeats = await postBookedSeatsSrv({ ...req.body });
  res.status(200).json({ message: "success", data: bookedSeats });
};

module.exports = {
  getBusLocationsController,
  getSearchBusController,
  getSpecificBusController,
  getBookedSeatsController,
  postBookedSeatsController
};
