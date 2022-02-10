import { useEffect, useState } from 'react';
import {
	signInWithEmailAndPassword,
	getAuth,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { app, db } from '../firebase';

const SignIn = () => {
	const [signInEmail, setSignInEmail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
	const auth = getAuth(app);

	const handleSignIn = async (e) => {
		e.preventDefault();

		const user = await signInWithEmailAndPassword(
			auth,
			signInEmail,
			signInPassword
		);
		console.log(user.user);
	};
	const handleSignOut = async () => {
		await signOut(auth);
	};

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			const uid = user.uid;
	// 			console.log('The User is Signed in ' + uid);
	// 		} else {
	// 			console.log('No USER');
	// 		}
	// 	});
	// }, []);

	const handleForgotPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, signInEmail);
			console.log('Reset Email Sent');
		} catch (e) {
			console.log(e.code + ' ' + e.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSignIn}>
				<input
					placeholder='email'
					type='email'
					onChange={(e) => setSignInEmail(e.target.value)}
				/>
				<br />
				<input
					placeholder='password'
					type='text'
					onChange={(e) => setSignInPassword(e.target.value)}
				/>
				<br />
				<button type='submit'>Sign In</button>
			</form>
			<button onClick={handleSignOut}>Sign Out</button>
			<a onClick={handleForgotPassword}>Forgot Password</a>
		</>
	);
};
export default SignIn;
