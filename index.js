const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const router = require('./routers')

const app = express();
const port = 8000;
// Create database connection and call all models
const db = require("./models");

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
app.use("/api", router)

db.sequelize.sync({ force: false }).then(function () {
  app.listen(port, function () {
    console.log("server is successfully running!");
  });
}); 