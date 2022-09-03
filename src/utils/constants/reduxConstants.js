// Redux Initial State
export const initialState = {
	uid: '',
	isLoggedIn: false,
	email: 'NoEmail',
	uname: 'Noname',
	currency: 'CAD',
	categories: [],
	transactions: {},
};

// Action Types

export const loggedTrue = 'loggedTrue';
export const txnAddStore = 'txnAddStore';
export const catStore = 'catStore';
export const accountData = 'accountData';
export const loggedFalse = 'loggedFalse';