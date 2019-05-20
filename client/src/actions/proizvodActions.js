import axios from 'axios';
import { GET_PROIZVODS, ITEMS_LOADING, ADD_PROIZVOD, DELETE_PROIZVOD, UPDATE_PROIZVOD, SEARCH } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProizvods = () => (dispatch) => {
	dispatch(setItemsLoading());
	axios.get('/api/proizvods').then((res) =>
		dispatch({
			type: GET_PROIZVODS,
			payload: res.data
		})
	);
};

export const addProizvod = (proizvod) => (dispatch, getState) => {
	axios
		.post('/api/proizvods', proizvod, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_PROIZVOD,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateProizvod = (proizvod, id) => (dispatch, getState) => {
	axios
		.post(`/api/proizvods/update/${id}`, proizvod, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: UPDATE_PROIZVOD,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteProizvod = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/proizvods/delete/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_PROIZVOD,
				payload: id
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};

export const searchProizvods = (searchText) => (dispatch) => {
	axios.post('/api/proizvods/search', searchText).then((res) =>
		dispatch({
			type: SEARCH,
			payload: res.data
		})
	);
};
