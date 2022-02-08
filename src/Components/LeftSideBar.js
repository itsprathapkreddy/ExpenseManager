import './components.css';
import { NavLink } from 'react-router-dom';
function LeftSideBar() {
	return (
		<div className='leftSidebar'>
			<NavLink
				className={({ isActive }) => (isActive ? 'activeLink' : 'navLinks')}
				to='/dashboard'>
				DASHBOARD
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? 'activeLink' : 'navLinks')}
				to='/transactions'>
				TRANSACTIONS
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? 'activeLink' : 'navLinks')}
				to='/category'>
				CATEGORIES
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? 'activeLink' : 'navLinks')}
				to='/account'>
				ACCOUNT
			</NavLink>
		</div>
	);
}
export default LeftSideBar;
