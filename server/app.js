'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const cors = require('cors');
const express = require('express');

const envConfig = require('./config/env');

require('./src/models/db.model')();

const app = express();
app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser');

let port = process.env.PORT || envConfig.get("PORT");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

let middleware = require('./helpers/authMiddleware')
app.use(middleware);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.resolve(__dirname, './assets')))

// Include all routes
require('./helpers/routes').route(app);
// Authorize routes
require('./src/operations/defaultUserSetup').setup();

//Handle errors with json response
app.use(require('./helpers/errorHandler'));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
