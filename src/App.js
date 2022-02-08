import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import LeftSideBar from './Components/LeftSideBar';
import BottomNavigation from './Components/BottomNavigation';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Screens/Dashboard';
import Transactions from './Screens/Transactions';
import Category from './Screens/Category';
import Account from './Screens/Account';

function App() {
	return (
		<>
			<div className='header'>EXPENSE MANAGER</div>
			<div className='appContainer'>
				<Container>
					<Row>
						<Col sm={3}>
							<LeftSideBar></LeftSideBar>
						</Col>
						<Col sm={9}>
							<Routes>
								<Route path='/' element={<Dashboard />} />
								<Route path='/dashboard' element={<Dashboard />} />
								<Route path='/transactions' element={<Transactions />} />
								<Route path='/category' element={<Category />} />
								<Route path='/account' element={<Account />} />
							</Routes>
						</Col>
					</Row>
				</Container>
			</div>
			<BottomNavigation />
		</>
	);
}

export default App;
