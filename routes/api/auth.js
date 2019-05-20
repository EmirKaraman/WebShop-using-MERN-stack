const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user - Login - Prijavi se
// @access  Public
router.post('/', (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: 'User Does not exist' });

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

			jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({
					token,
					user: {
						id: user.id,
						name: user.name,
						email: user.email
					}
				});
			});
		});
	});
});

/* Provjerava jesu unijeti validni podaci za login, zatim provjerava da li user postoji, ako ne postoji izbacuje se error ka frontendu,
a ako postoji provjerava se da li se podudara password sa onim u bazi podataka za istog usera, ali se mora prvo kriptovati da bi se uporedilo,
jer je password nakon registracije kriptovan a onaj sto stigne sa frontenda je plain text password.
ako se ne podudaraju passwordi login nije dozvoljen, u suprotnom login je dozvoljen, izradjuje se token i salje nazad u frontend zajendo sa user podacima.

*/

// @route   GET api/auth/user
// @desc    Get logged in user data
// @access  Private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id).select('-password').then((user) => res.json(user));
});

//ova metoda je get koristi se da se dobije informacija o logovanom useru i prikaze na frontend homepage kad je user logovan, njegovo ime npr.
//u middleware si snimio user.id u req.user i to stigne preko auth u ovu metodu, tako da iskoristis to i mozes naci usera koji je logovan.

module.exports = router;
