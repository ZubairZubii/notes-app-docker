// Importing Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inititating Express
const app = express();

// Environment Variables
require("dotenv").config();

// Connecting to Database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(process.env.PORT || 3000, () => {
      console.log("Connection to the Database was established!");
    })
  )
  .catch((error) => console.log(error));


// Middlewares
app.use(express.json()); // JSON Parser
app.use(express.urlencoded({ extended: true })); // URL Body Parser

// Updated CORS configuration for the Express server
const corsOptions = {
  origin: ['http://localhost', 'http://localhost:80', 'http://frontend', '*'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// For debugging purposes, log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  next();
});

// Routes
const routes = require("./routes/routes");
app.use(routes);
