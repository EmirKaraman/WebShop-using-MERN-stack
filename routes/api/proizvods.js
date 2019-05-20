const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Proizvod = require('../../models/Proizvod');

// @route   GET api/proizvods
// @desc    Get svi proizvodi
// @access  Public
router.get('/', (req, res) => {
	Proizvod.find()
		.sort({ date: -1 })
		.then((proizvodi) => res.json(proizvodi))
		.catch((err) => res.status(404).json({ success: false }));
});
//Nadjes sve proizvode i sortiras ih po opadajucem resoslijedu na osnovu datuma kad su dodani.

// @route   POST api/proizvods
// @desc    Dodaj proizvod
// @access  Private
router.post('/', auth, (req, res) => {
	const newProizvod = new Proizvod({
		ime: req.body.ime,
		cijena: req.body.cijena,
		kolicina: req.body.kolicina
	});

	newProizvod.save().then((proizvod) => res.json(proizvod)).catch((err) => res.json(err));
});

// @route   POST api/proizvods/update/:id
// @desc    Update prizvod by getting id from react, send updated array of proizvods
// @access  Private
router.post('/update/:id', auth, (req, res) => {
	Proizvod.findOne({ _id: req.params.id })
		.then((proizvod) => {
			proizvod.ime = req.body.ime;
			proizvod.cijena = req.body.cijena;
			proizvod.kolicina = req.body.kolicina;

			proizvod.save().then((proizvod) => {
				Proizvod.find().sort({ date: -1 }).then((proizvodi) => res.json(proizvodi));
			});
		})
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   DELETE api/proizvods/delete/:id
// @desc    Delete proizvod by getting id from react
// @access  Private
router.delete('/delete/:id', auth, (req, res) => {
	Proizvod.findById(req.params.id)
		.then((proizvod) => proizvod.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   POST api/proizvods/search
// @desc    Search for proizvods that match the caracters from req.body
// @access  Private
router.post('/search', (req, res) => {
	let searchProizvodi = [];
	Proizvod.find()
		.then((proizvodi) => {
			proizvodi.forEach((element) => {
				if (element.ime.includes(req.body.ime)) {
					searchProizvodi.push(element);
				}
			});
			res.json(searchProizvodi);
		})
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
