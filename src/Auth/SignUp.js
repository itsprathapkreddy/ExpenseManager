import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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
import MuiLoader from '../Screens/MuiLoader';

import Alert from '@mui/material/Alert';

const SignUp = () => {
	const [loader, setLoader] = useState(false);
	let navigate = useNavigate();
	const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [uname, setUname] = useState('');
	const [cur, setCur] = useState('CAD');
	const auth = getAuth(app);
	const [errMessage, setErrMessage] = useState('');
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn);

	const currencyData = [
		{ htmlCode: '164', name: 'generic currency symbol' },
		{ htmlCode: '36', name: 'dollar sign' },
		{ htmlCode: '162', name: 'cent sign' },
		{ htmlCode: '163', name: 'pound sterling' },
		{ htmlCode: '165', name: 'yen symbol' },
		{ htmlCode: '8355', name: 'franc sign' },
		{ htmlCode: '8356', name: 'lira symbol' },
		{ htmlCode: '8359', name: 'peseta sign' },
		{ htmlCode: '8364', name: 'euro symbol' },
		{ htmlCode: '8377', name: 'rupee symbol' },
		{ htmlCode: '8361', name: 'won sign' },
		{ htmlCode: '8372', name: 'hryvnia sign' },
		{ htmlCode: '8367', name: 'drachma sign' },
		{ htmlCode: '8366', name: 'tugrik sign' },
		{ htmlCode: '8368', name: 'german penny sign' },
		{ htmlCode: '8370', name: 'guarani sign' },
		{ htmlCode: '8369', name: 'peso sign' },
		{ htmlCode: '8371', name: 'austral sign' },
		{ htmlCode: '8373', name: 'cedi sign' },
		{ htmlCode: '8365', name: 'kip sign' },
		{ htmlCode: '8362', name: 'new sheqel sign' },
		{ htmlCode: '8363', name: 'dong sign' },
	];

	const handleSignUp = async (e) => {
		setLoader(true);
		e.preventDefault();
		const defaultData = {
			uname: uname,
			currency: cur,
			email: signUpEmail,
			timeStamp: serverTimestamp(),
			transactions: {},
			categories: [
				'Groceries',
				'Eating Out',
				'Coffee',
				'Travel',
				'Shopping',
				'Entertainment',
				'Education',
				'Rent',
				'Gift',
				'Partying',
				'Phone',
			],
		};
		let user;
		try {
			user = await createUserWithEmailAndPassword(
				auth,
				signUpEmail,
				signUpPassword
			);
		} catch (e) {
			setErrMessage(e.code);
			setLoader(false);
			return;
		}

		dispatch({
			type: 'loggedTrue',
			payload: defaultData,
		});
		await setDoc(doc(db, 'users', user.user.uid), defaultData);
		setLoader(false);
	};

	return (
		<div className='signInContainer'>
			{loader && <MuiLoader />}
			<div className='signInPage'>
				<div className='authHeader'>Expense Manager</div>
				<form onSubmit={handleSignUp}>
					<TextField
						margin='normal'
						required
						autoFocus
						fullWidth
						label='Name'
						onChange={(e) => setUname(e.target.value)}
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
						<InputLabel id='demo-simple-select-label'>Currency</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={cur}
							label='Currency'
							onChange={(e) => setCur(e.target.value)}>
							{currencyData.map((x, i) => (
								<MenuItem
									key={i}
									value={String.fromCharCode(x.htmlCode) + ' ' + x.name}>
									{String.fromCharCode(x.htmlCode) + ' ' + x.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{errMessage && (
						<Alert severity='error' style={{ marginTop: '10px' }}>
							{errMessage}
						</Alert>
					)}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						style={{ margin: '20px 0' }}>
						Sign Up
					</Button>
				</form>
				<Grid container>
					<Grid item sm={4}>
						<p
							className='links'
							onClick={() => {
								navigate('../forgotpassword', { replace: true });
							}}>
							Forgot password?
						</p>
					</Grid>
					<Grid item sm={8} textAlign='right'>
						<p
							className='links'
							onClick={() => {
								navigate('../signin', { replace: true });
							}}>
							{'Already have an account? Sign In'}
						</p>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
export default SignUp;
