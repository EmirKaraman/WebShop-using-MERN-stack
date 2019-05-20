import axios from 'axios';
import { returnErrors } from './errorActions';

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from './types';

export const register = ({ name, email, password }) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ name, email, password });

	axios
		.post('/api/users', body, config)
		.then((res) =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

//od podataka sa frontenda uzima sve i salje kao json objekat backendu zajedno sa headerom tipa application json
//kao povatnu info za reducera salje pristigli token i usera, a ako nije uspjela registracija dispatcuje se error i akcija register fail.

export const login = ({ email, password }) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ email, password });

	axios
		.post('/api/auth', body, config)
		.then((res) =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

//Radi sve isto kao onaj register action ali neke promjene oko imena akcija i td

export const logout = () => {
	return {
		type: LOGOUT_SUCCESS
	};
};

//SAV PROCES se vrsi na frontendu oko logout-a, brise se token iz localstorage i sve iz state za auth se stavi na null

export const tokenConfig = (getState) => {
	const token = getState().auth.token;

	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};

//Ova metoda prima getState, sto je jedna od redux prednosti, pomocu ovoga imas pristup citavom stablu redux state-a, tako da ti je token preuzet iz state-a preko getState().auth.token
//Posto ce svaki poziv ka backendu zahtijevati headere, ti si unaprijed naveo da je header application json ukoliko ne postoji token,
//a ako postoji token, odnosno logovan je user onda ce u backend biti poslat i header sa tokenom, pa onda user ima pristup svim backend metodama.
//a mogu biti poslana i oba headera ako trebaju jer se token header dodaje na vec postojeci

export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING });

	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

//ova akcija prima x-auth-token header zato si pozivao ovu tokenConfig metodu a vraca podatke logovanog usera na frontend.
