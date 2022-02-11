import { PlaylistAddOutlined } from '@mui/icons-material';
import { createStore } from 'redux';

const intialState = { isLoggedIn: false, email: '', user: 'user' };

const rootReducer = (state = intialState, action) => {
	switch (action.type) {
		case 'loggedTrue': {
			alert(action.payload);
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
				email: action.payload,
			};
		}
		case 'loggedFalse':
			return { ...state, isLoggedIn: false };
		default:
			return state;
	}
};

const store = createStore(rootReducer);
export default store;
