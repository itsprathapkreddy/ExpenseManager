import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	getAuth,
} from 'firebase/auth';
import { app, db } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import currenctData from '../Data/currencies.json';

const SignUp = () => {
	// console.log(currenctData);
	let navigate = useNavigate();
	const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [name, setName] = useState('');
	const [cur, setCur] = useState('CAD');
	const auth = getAuth(app);
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn);

	const handleSignUp = async (e) => {
		e.preventDefault();
		const defaultData = {
			displayName: name,
			currency: cur,
			email: signUpEmail,
			timeStamp: serverTimestamp(),
		};
		const user = await createUserWithEmailAndPassword(
			auth,
			signUpEmail,
			signUpPassword
		);
		dispatch({
			type: 'loggedTrue',
			payload: defaultData,
		});
		await setDoc(doc(db, 'users', user.user.uid), defaultData);
		navigate('/', { replace: true });
	};

	const handleForgotPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, signUpEmail);
			console.log('Reset Email Sent');
		} catch (e) {
			console.log(e.code + ' ' + e.message);
		}
	};
	let age = 20;
	let tempObj = currenctData;
	let temparr = Object.keys(tempObj);
	return (
		<>
			<Grid container spacing={0} justify='center'>
				<Grid item sm={7}>
					<div style={{ backgroundColor: 'black', height: '100%' }}></div>
				</Grid>

				<Grid item sm={5} className='signInPage'>
					<form onSubmit={handleSignUp} className='formSignIn'>
						<center>
							<h2>SIGN UP PAGE</h2>
						</center>
						<TextField
							margin='normal'
							required
							autoFocus
							fullWidth
							label='Name'
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Email Address'
							onChange={(e) => setSignUpEmail(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Password'
							type='password'
							onChange={(e) => setSignUpPassword(e.target.value)}
						/>
						<FormControl fullWidth style={{ marginTop: '10px' }}>
							<InputLabel id='demo-simple-select-label'>Age</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={cur}
								label='Age'
								onChange={(e) => setCur(e.target.value)}>
								{temparr.map((x) => (
									<MenuItem key={x} value={x}>
										{tempObj[x]}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							style={{ margin: '20px 0' }}>
							Sign Up
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
									navigate('../signin', { replace: true });
								}}>
								{'Already have an account? Sign In'}
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{/* {!isLoggedIn ? (
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
			) : (
				'You are already Logged In'
			)} */}
		</>
	);
};
export default SignUp;
