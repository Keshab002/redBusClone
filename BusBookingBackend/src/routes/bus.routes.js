const express = require("express");
const {
  getBusLocationsController,
  getSearchBusController,
  getSpecificBusController,
  getBookedSeatsController,
} = require("../controllers/busController");

const router = express.Router();


router.get("/GetBusLocations", getBusLocationsController);
router.get("/SearchBuses", getSearchBusController);
router.get("/GetSpecificBus", getSpecificBusController); // Placeholder for specific bus controller
router.get("/GetBookedSeats", getBookedSeatsController); // Placeholder for booked seats controller

module.exports = router;
