import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { curData } from '../utils/constants/constants';
import {
	doc,
	setDoc,
	updateDoc,
	serverTimestamp,
	deleteField,
} from 'firebase/firestore';
import { db, app } from '../Auth/firebase';

import { signOut, getAuth } from 'firebase/auth';

const Account = () => {
	const auth = getAuth(app);
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.uid);
	const data = useSelector((state) => state);
	const [edit, setEdit] = useState(false);
	const [newUname, setNewUname] = useState(data.uname);
	const [newCur, setNewCur] = useState(data.currency);
	const handleUpdate = async () => {
		setEdit(false);
		await setDoc(
			doc(db, 'users', userId),
			{
				uname: newUname,
				currency: newCur,
			},
			{ merge: true }
		);
		dispatch({
			type: 'accountData',
			payload: {
				uname: newUname,
				currency: newCur,
			},
		});
	};
	const logouthandler = async () => {
		await signOut(auth);
		dispatch({ type: 'loggedFalse' });
	};
	return (
		<div className='account'>
			<div className='accountHeader'>Account Details</div>
			<div
				style={{
					width: '90%',
					margin: '5%',
					padding: '20px 10px',
					backgroundColor: 'white',
					fontSize: '80%',
					borderRadius: '5px',
				}}>
				{!edit && (
					<table>
						<tbody>
							<tr>
								<td style={{ padding: '10px' }}>User&nbsp;Name:</td>
								<td>{newUname}</td>
							</tr>
							<tr>
								<td style={{ padding: '10px' }}>Currency:</td>
								<td>{newCur}</td>
							</tr>
							<tr>
								<td style={{ padding: '10px' }}>Email:</td>
								<td>{data.email}</td>
							</tr>
						</tbody>
					</table>
				)}
				{edit && (
					<>
						<TextField
							label='User Name'
							value={newUname}
							style={{ margin: '10px 0px', width: '100%' }}
							onChange={(e) => setNewUname(e.target.value)}
							variant='filled'
						/>
						<FormControl
							variant='filled'
							fullWidth
							style={{ margin: '10px 0px' }}>
							<InputLabel id='demo-simple-select-label'>Currency</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={newCur}
								label='Currency'
								onChange={(e) => setNewCur(e.target.value)}>
								{curData.map((x, i) => (
									<MenuItem
										key={i}
										value={String.fromCharCode(x.htmlCode) + ' ' + x.name}>
										{String.fromCharCode(x.htmlCode) + ' ' + x.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							label='Email'
							disabled
							value={data.email}
							style={{ margin: '10px 0px', width: '100%' }}
							variant='filled'
						/>
					</>
				)}
				<div style={{ margin: '10px' }}>
					{!edit && (
						<Button variant='contained' onClick={() => setEdit(true)}>
							Edit
						</Button>
					)}
					{edit && (
						<>
							<Button
								variant='contained'
								color='success'
								onClick={handleUpdate}>
								Update
							</Button>
							<Button
								variant='contained'
								color='error'
								onClick={() => {
									setNewCur(data.currency);
									setNewUname(data.uname);
									setEdit(false);
								}}
								style={{ margin: '0px 10px' }}>
								Cancel
							</Button>
						</>
					)}
				</div>
			</div>
			<div
				style={{
					width: '90%',
					margin: '5%',
					padding: '20px 10px',
					backgroundColor: 'white',
					fontSize: '80%',
					borderRadius: '5px',
				}}>
				<Button
					variant='contained'
					style={{ backgroundColor: '#f44336' }}
					fullWidth
					onClick={logouthandler}>
					Logout
				</Button>
			</div>
		</div>
	);
};
export default Account;
