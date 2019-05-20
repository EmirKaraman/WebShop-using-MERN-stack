import { GET_PROIZVODS, ITEMS_LOADING, ADD_PROIZVOD, UPDATE_PROIZVOD, DELETE_PROIZVOD, SEARCH } from '../actions/types';

const initialState = {
	proizvods: [],
	loading: false,
	searchProizvods: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PROIZVODS:
			return {
				...state,
				proizvods: action.payload,
				loading: false
			};
		case ADD_PROIZVOD:
			return {
				...state,
				proizvods: [ action.payload, ...state.proizvods ]
			};
		case UPDATE_PROIZVOD:
			return {
				...state,
				proizvods: action.payload
			};
		case DELETE_PROIZVOD:
			return {
				...state,
				proizvods: state.proizvods.filter((proizvod) => proizvod._id !== action.payload)
			};
		case SEARCH:
			return {
				...state,
				searchProizvods: action.payload
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
