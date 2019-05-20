const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const KorpaSchema = new Schema({
	ime: {
		type: String,
		required: true
	},
	cijena: {
		type: Number,
		required: true
	}
});

module.exports = Korpa = mongoose.model('korpa', KorpaSchema);
