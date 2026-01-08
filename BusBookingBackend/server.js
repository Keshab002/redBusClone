// main server file that starts the express app
const express = require("express"); // -> It helps to create the server and handle routing
const cors = require("cors"); // -> It enables Cross-Origin Resource Sharing -> Means it allows requests from different domains
const corsConfig = require("./src/config/corsConfig");
const busRoutes = require("./src/routes/bus.routes");
const userRoutes = require("./src/routes/user.routes");

const PORT_NUMBER = 3000; // -> Default port number

app = express(); // -> Create an instance of express application
app.use(express.json()); // -> Middleware to parse JSON bodies
app.use(cors(corsConfig)); // -> Apply CORS configuration

app.use("/api/v1", busRoutes, userRoutes); // -> Use bus routes with the base path /api/v1

app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`); // -> Log message when server starts
});
