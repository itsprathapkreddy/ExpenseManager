import { getAuth, signOut } from 'firebase/auth';
import { createStore } from 'redux';
import { app } from '../Auth/firebase';
const intialState = {
	uid: '',
	isLoggedIn: false,
	email: 'NoEmail',
	uname: 'Noname',
	currency: 'CAD',
	categories: [],
	transactions: {},
};

const rootReducer = (state = intialState, action) => {
	console.log(action);
	switch (action.type) {
		case 'loggedTrue': {
			return {
				...state,
				isLoggedIn: true,
				uname: action.payload.uname,
				email: action.payload.email,
				currency: action.payload.currency,
				categories: action.payload.categories,
				uid: action.payload.uid,
				transactions: action.payload.transactions,
			};
		}
		case 'txnAddStore': {
			return {
				...state,
				transactions: action.payload,
			};
		}
		case 'catStore': {
			return {
				...state,
				categories: action.payload,
			};
		}
		case 'accountData': {
			return {
				...state,
				uname: action.payload.uname,
				currency: action.payload.currency,
			};
		}
		case 'loggedFalse':
			return { isLoggedIn: false };

		default:
			return state;
	}
};

const store = createStore(rootReducer);
export default store;
