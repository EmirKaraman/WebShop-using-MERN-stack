import { combineReducers } from 'redux';
import proizvodReducer from './proizvodReducer';
import korpaReducer from './korpaReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
	proizvod: proizvodReducer,
	korpa: korpaReducer,
	error: errorReducer,
	auth: authReducer
});
