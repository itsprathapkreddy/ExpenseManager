import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Routes, Route } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MergeTypeIcon from '@mui/icons-material/MergeType';

import Dashboard from '../Screens/Dashboard';
import Transactions from '../Screens/Transactions';
import Category from '../Screens/Category';
import Account from '../Screens/Account';

import './components.css';

export default function SimpleBottomNavigation() {
	const [value, setValue] = useState(0);

	return (
		<Box sx={{ width: '100%' }} className='bottomNavigation'>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}>

				<BottomNavigationAction label='Dashboard' icon={<DashboardIcon />} />
				<BottomNavigationAction
					label='Transactions'
					icon={<CompareArrowsIcon />}
				/>
				<BottomNavigationAction label='Categories' icon={<MergeTypeIcon />} />
				<BottomNavigationAction label='Account' icon={<AccountCircleIcon />} />
			</BottomNavigation>
		</Box>
	);
}
