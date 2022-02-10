import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app, db } from '../firebase';

const SignUp = () => {
	const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const auth = getAuth(app);

	const handleSignUp = async (e) => {
		e.preventDefault();
		const defaultData = {
			displayName: 'User',
			currency: 'CAD',
		};
		const user = await createUserWithEmailAndPassword(
			auth,
			signUpEmail,
			signUpPassword
		);
		await setDoc(doc(db, 'users', user.user.uid), defaultData);
	};
	return (
		<form onSubmit={handleSignUp}>
			<input
				placeholder='email'
				type='email'
				onChange={(e) => setSignUpEmail(e.target.value)}
			/>
			<br />
			<input
				placeholder='password'
				type='text'
				onChange={(e) => setSignUpPassword(e.target.value)}
			/>
			<br />
			<button type='submit'>Sign Up</button>
		</form>
	);
};
export default SignUp;
