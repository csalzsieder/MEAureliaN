var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    userName: String,
    name: String,
    description: String,
    longitude: String,
    latitude: String
});

module.exports = mongoose.model( 'Locations', locationSchema );