import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import './dashboard.css';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { useState } from 'react';
import Transactions from '../Screens/Transactions';
import Account from '../Screens/Account';
import Categories from '../Screens/Categories';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Overview from '../Screens/Overview';

const DashBoard = () => {
	const data = useSelector((state) => state);
	const [page, setPage] = useState('overview');
	const [value, setValue] = useState(0);

	return (
		<Grid container spacing={0}>
			<Grid item md={2} xs={0} style={{ position: 'relative' }}>
				<div className='buttonContainer'>
					<div className='dashboardHead'>Expense Manager</div>
					<div className='buttons' onClick={() => setPage('overview')}>
						<DashboardCustomizeRoundedIcon sx={{ fontSize: 20 }} />
						&nbsp; Overview
					</div>
					<div className='buttons' onClick={() => setPage('transactions')}>
						<CompareArrowsRoundedIcon sx={{ fontSize: 20 }} />
						&nbsp; Transactions
					</div>
					<div className='buttons' onClick={() => setPage('categories')}>
						<CategoryRoundedIcon sx={{ fontSize: 20 }} />
						&nbsp; Categories
					</div>
					<div className='buttons' onClick={() => setPage('account')}>
						<AccountCircleRoundedIcon sx={{ fontSize: 20 }} />
						&nbsp; Account
					</div>
				</div>
			</Grid>
			<Grid item md={10} xs={12}>
				<div className='screenContainer'>
					{page == 'overview' && <Overview />}
					{page == 'transactions' && <Transactions />}
					{page == 'categories' && <Categories />}
					{page == 'account' && <Account />}
				</div>
			</Grid>
			<div className='bottomNav'>
				<BottomNavigation
					style={{ backgroundColor: '#F5F5F5' }}
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
						switch (newValue) {
							case 1:
								setPage('transactions');
								break;
							case 2:
								setPage('categories');
								break;
							case 3:
								setPage('account');
								break;
							default:
								setPage('overview');
						}
					}}>
					<BottomNavigationAction
						label='overview'
						icon={<DashboardCustomizeRoundedIcon />}
					/>
					<BottomNavigationAction
						label='transactions'
						icon={<CompareArrowsRoundedIcon />}
					/>
					<BottomNavigationAction
						label='categories'
						icon={<CategoryRoundedIcon />}
					/>
					<BottomNavigationAction
						label='account'
						icon={<AccountCircleRoundedIcon />}
					/>
				</BottomNavigation>
			</div>
		</Grid>
	);
};
export default DashBoard;
