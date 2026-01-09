const express = require("express");
const {
  getBusLocationsController,
  getSearchBusController,
  getSpecificBusController,
  getBookedSeatsController,
  postBookedSeatsController,
} = require("../controllers/busController");

const router = express.Router();

router.get("/GetBusLocations", getBusLocationsController);
router.get("/SearchBuses", getSearchBusController);
router.get("/GetSpecificBus", getSpecificBusController);
router.get("/GetBookedSeats", getBookedSeatsController);
router.post("/BookSeats", postBookedSeatsController);

module.exports = router;
