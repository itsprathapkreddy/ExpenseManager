import './app.css';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import PageNotFound from './Components/PageNotFound';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app, db } from './Auth/firebase';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from './Components/DashBoard';
import { doc, getDoc } from 'firebase/firestore';

function App() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const dispatch = useDispatch();
	const uid = useSelector((state) => state.uid);
	const auth = getAuth(app);

	useEffect(() => {
		// const temp01 = async (uid) => {
		// 	const docRef = doc(db, 'users', uid);
		// 	const docSnap = await getDoc(docRef);
		// 	if (docSnap.exists()) {
		// 		const data = docSnap.data();
		// 		console.log(data);
		// 		dispatch({
		// 			type: 'loggedTrue',
		// 			payload: {
		// 				uname: data.uname,
		// 				email: data.email,
		// 				currency: data.currency,
		// 				categories: data.categories,
		// 				uid: uid,
		// 				transactions: data.transactions,
		// 			},
		// 		});
		// 	}
		// };
		// temp01(uid);
	}, []);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						isLoggedIn ? (
							<Navigate to='/dashboard' />
						) : (
							<Navigate to='/signin' />
						)
					}
				/>
				<Route
					path='/dashboard'
					element={isLoggedIn ? <DashBoard /> : <Navigate to='/signin' />}
				/>
				<Route
					path='/signin'
					element={isLoggedIn ? <Navigate to='/dashboard' /> : <SignIn />}
				/>
				<Route
					path='/signup'
					element={isLoggedIn ? <Navigate to='/dashboard' /> : <SignUp />}
				/>

				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
