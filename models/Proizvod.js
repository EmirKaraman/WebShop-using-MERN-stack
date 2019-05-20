const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProizvodSchema = new Schema({
	ime: {
		type: String,
		required: true
	},
	cijena: {
		type: Number,
		required: true
	},
	kolicina: {
		type: Number,
		required: true
	},
	register_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Proizvod = mongoose.model('proizvod', ProizvodSchema);
