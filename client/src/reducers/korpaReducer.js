import {
	GET_KORPAPROIZVODS,
	ITEMS_LOADING,
	ADD_KORPAPROIZVOD,
	DELETE_KORPAPROIZVOD,
	DELETE_ALL,
	UPDATE_KORPAPROIZVOD,
	IZRACUNAJ_CIJENU
} from '../actions/types';

const initialState = {
	korpaProizvods: [],
	loading: false,
	ukupnaCijena: 0
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_KORPAPROIZVODS:
			return {
				...state,
				korpaProizvods: action.payload,
				loading: false
			};
		case ADD_KORPAPROIZVOD:
			return {
				...state,
				korpaProizvods: [ action.payload, ...state.korpaProizvods ]
			};
		case UPDATE_KORPAPROIZVOD:
			return {
				...state,
				korpaProizvods: action.payload
			};
		case DELETE_KORPAPROIZVOD:
			return {
				...state,
				korpaProizvods: state.korpaProizvods.filter((korpaProizvod) => korpaProizvod._id !== action.payload)
			};
		case DELETE_ALL:
			return {
				...state,
				korpaProizvods: []
			};
		case IZRACUNAJ_CIJENU:
			return {
				...state,
				ukupnaCijena: action.payload
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
