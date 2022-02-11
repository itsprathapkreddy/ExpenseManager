import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Home from './Components/Home';
import PageNotFound from './Components/PageNotFound';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app, db } from './Auth/firebase';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header';
import TestSignIn from './Auth/TestSignIn';

function App() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const dispatch = useDispatch();
	const auth = getAuth(app);

	return (
		<>
			{/* <Header /> */}

			<Routes>
				<Route path='/' element={isLoggedIn ? <Home /> : <SignIn />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
