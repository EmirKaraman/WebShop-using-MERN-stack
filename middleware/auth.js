const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;

//Uz ovaj middleware, kad ubacis u svaki request koji zelis da osiguras da je user logovan, ova metoda ce da provjeri,
//i ukoliko je user logovan bit ce snimljeni njegovi podaci u req.user varijablu a sami request ce biti proslijedjen dalje, odnosno dopusten put do zeljenog backend http zahtjeva
//ovim sto imas snimljen user.id u req.user, mozes to da iskoristis kad zelis da nadjes usera i posaljes full podatke tog usera na frontend.
