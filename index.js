// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const handle = require('./handlers');
const db = require('./models');
const routes = require('./routes');
const path = require('path');


const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

app.use(handle.notFound);
app.use(handle.errors);
mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/poll");
mongoose.connect("mongodb://heroku_zlz4q8w1@ds143451.mlab.com:43451/heroku_zlz4q8w1");

app.listen(port, console.log(`Server listening on port ${port}`)); 