var mongoose = require('mongoose');
var PiaofangSchema = require('../schemas/piaofang');
var Piaofang = mongoose.model('Piaofang',PiaofangSchema);
module.exports = Piaofang