import './auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import {
	signInWithEmailAndPassword,
	getAuth,
	signOut,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from './firebase';

const SignIn = () => {
	let navigate = useNavigate();
	const auth = getAuth(app);
	const [signInEmail, setSignInEmail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const sentData = useSelector((state) => state.user);

	const handleSignIn = async (e) => {
		e.preventDefault();
		console.log('Loading........');
		const user = await signInWithEmailAndPassword(
			auth,
			signInEmail,
			signInPassword
		);
		console.log(user.user.uid + ':' + user.user.email);
		dispatch({
			type: 'loggedTrue',
			payload: user.user.email,
		});
	};

	const handleSignOut = async () => {
		await signOut(auth);
		dispatch({ type: 'loggedFalse' });
	};

	const handleForgotPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, signInEmail);
			console.log('Reset Email Sent');
		} catch (e) {
			console.log(e.code + ' ' + e.message);
		}
	};

	return (
		<Grid container spacing={0} justify='center'>
			<Grid item sm={7}>
				<div style={{ backgroundColor: 'black', height: '100%' }}></div>
			</Grid>

			<Grid item sm={5} className='signInPage'>
				<form onSubmit={handleSignIn} className='formSignIn'>
					<center>
						<h2>SIGN IN PAGE</h2>
					</center>
					<TextField
						margin='normal'
						required
						autoFocus
						fullWidth
						label='Email Address'
						onChange={(e) => setSignInEmail(e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Password'
						type='password'
						onChange={(e) => setSignInPassword(e.target.value)}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						style={{ margin: '20px 0' }}>
						Sign In
					</Button>
				</form>
				<Grid container>
					<Grid item xs>
						<Link href='#' variant='body2' onClick={handleForgotPassword}>
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link
							href='#'
							variant='body2'
							onClick={() => {
								navigate('../signup', { replace: true });
							}}>
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
				<h1>{sentData}</h1>
			</Grid>
		</Grid>
	);
};
export default SignIn;
