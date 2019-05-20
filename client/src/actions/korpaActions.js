import axios from 'axios';
import {
	GET_KORPAPROIZVODS,
	ITEMS_LOADING,
	ADD_KORPAPROIZVOD,
	DELETE_KORPAPROIZVOD,
	DELETE_ALL,
	UPDATE_KORPAPROIZVOD,
	IZRACUNAJ_CIJENU
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getKorpaProizvods = () => (dispatch, getState) => {
	dispatch(setItemsLoading());
	axios
		.get('/api/korpas', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_KORPAPROIZVODS,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addKorpaProizvod = (korpaProizvod) => (dispatch, getState) => {
	axios
		.post('/api/korpas', korpaProizvod, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_KORPAPROIZVOD,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateKorpaProizvod = (korpaProizvod, id) => (dispatch, getState) => {
	axios
		.post(`/api/korpas/update/${id}`, korpaProizvod, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: UPDATE_KORPAPROIZVOD,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteKorpaProizvod = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/korpas/delete/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_KORPAPROIZVOD,
				payload: id
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteAll = () => (dispatch, getState) => {
	axios
		.delete(`/api/korpas/delete`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_ALL
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const izracunajUkupnuCijenu = () => (dispatch, getState) => {
	axios
		.get('/api/korpas/ukupnaCijena', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: IZRACUNAJ_CIJENU,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};
