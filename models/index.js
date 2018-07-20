const mongoose = require('mongoose');

mongoose.set('debug', true);


module.exports.User = require('./user');
module.exports.Poll = require('./poll');