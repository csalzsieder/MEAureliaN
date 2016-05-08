var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    userId: String,
    name: String,
    description: String,
    longitude: String,
    latitude: String
});

module.exports = mongoose.model( 'Locations', locationSchema );