var mongoose = require('mongoose');
var NewSchema = require('../schemas/new');
var New = mongoose.model('New',NewSchema);
module.exports = New