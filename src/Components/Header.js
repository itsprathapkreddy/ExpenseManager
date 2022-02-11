import './Header.css';
import { useSelector, usedispatch } from 'react-redux';
const Header = () => {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	return (
		<>
			<div className='header'>Expense Manager</div>
			<br />
			{isLoggedIn ? <button>Logout</button> : 'HI USER'}
			<br />
		</>
	);
};
export default Header;
