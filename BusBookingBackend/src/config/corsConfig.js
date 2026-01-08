const allowedOrigins = ["http://localhost:4209"];

// module.exports defines the CORS configuration for the application
// What is Module.exports?
// In Node.js, module.exports is used to export functions, objects, or primitives from a given file or module
// so they can be used in other files by requiring that module.
module.exports = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Enable cookies and authentication
};
