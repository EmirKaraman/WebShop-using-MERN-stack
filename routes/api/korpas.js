const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Korpa = require('../../models/Korpa');
const Proizvod = require('../../models/Proizvod');

// @route   GET api/korpas
// @desc    Get sve proizvode u kopri
// @access  Public
router.get('/', auth, (req, res) => {
	Korpa.find()
		.sort({ date: -1 })
		.then((korpi) => res.json(korpi))
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   POST api/korpas
// @desc    Dodaj proizvod u korpu, potrebo ime i cijena u req.body
// @access  Private
router.post('/', auth, (req, res) => {
	if (req.body.ime && req.body.cijena && req.body.kolicina > 1) {
		const k1 = new Korpa({
			ime: req.body.ime,
			cijena: req.body.cijena
		});

		Proizvod.findOne({ _id: req.body._id })
			.then((proizvod) => {
				proizvod.kolicina = req.body.kolicina - 1;
				proizvod.save().then((pomProizvod) => {
					k1.save().then((korpa) => res.json(korpa));
				});
			})
			.catch((err) => res.status(404).json({ success: false }));
		//Potrebno je prilikom dodaje novog proizvoda u korpu, smanjit kolicinu tog prouzvoda za 1
	}
});

// @route   POST api/korpas/update/:id
// @desc    Update korpa prizvod by getting id from react, send updated array of korpa proizvods
// @access  Private
router.post('/update/:id', auth, (req, res) => {
	Korpa.findOne({ _id: req.params.id })
		.then((korpaProizvod) => {
			korpaProizvod.ime = req.body.ime;
			korpaProizvod.cijena = req.body.cijena;

			korpaProizvod.save().then((pom) => {
				Korpa.find()
					.sort({ date: -1 })
					.then((korpaProizvodiNiz) => res.json(korpaProizvodiNiz))
					.catch((err) => res.json(err));
			});
		})
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   DELETE api/korpas/delete/:id
// @desc    Delete article from korpa by getting id from react
// @access  Private
router.delete('/delete/:id', auth, (req, res) => {
	Korpa.findById(req.params.id)
		.then((article) => article.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   GET api/korpas/ukupnaCijena
// @desc    Get sve proizvode u kopri
// @access  Public
router.get('/ukupnaCijena', auth, (req, res) => {
	Korpa.find().then((nizProizvodaUkorpi) => {
		let ukupnaCijena = 0;
		nizProizvodaUkorpi.forEach((element) => {
			ukupnaCijena += element.cijena;
		});
		res.json(ukupnaCijena);
	});
});

// @route   DELETE api/korpas/delete
// @desc    Delete all articles from korpa, return empty array
// @access  Private
router.delete('/delete', auth, (req, res) => {
	Korpa.deleteMany({})
		.then((data) => res.json({ success: true }))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
