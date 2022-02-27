import './Header.css';
import { app } from '../Auth/firebase';
import { useSelector, usedispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';

const Header = () => {
	const auth = getAuth(app);
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	return (
		<>
			<div className='header'>Expense Manager</div>
		</>
	);
};
export default Header;
