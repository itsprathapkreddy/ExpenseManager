import './App.css';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app, db } from './firebase';
import { useEffect, useState } from 'react';
import { isMobileCordova } from '@firebase/util';

function App() {
	const auth = getAuth(app);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setIsLoggedIn(true);
				console.log('The User is Signed in ' + uid);
			} else {
				console.log('No USER');
			}
		});
	}, []);
	return (
		<>
			<SignIn />

			<SignUp />
			<h1>{isLoggedIn == false && 'kjashdk wkejhwh'}</h1>
		</>
	);
}

export default App;
