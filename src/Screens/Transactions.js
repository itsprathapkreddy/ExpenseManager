import { Button, Grid } from '@mui/material';
import '../Components/dashboard.css';
// import transData from '../Data/transData.json';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ModalUnstyled } from '@mui/base';
import TextField from '@mui/material/TextField';
import { styled, Box } from '@mui/system';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../Auth/firebase';

import {
	doc,
	setDoc,
	updateDoc,
	serverTimestamp,
	deleteField,
} from 'firebase/firestore';

const Transactions = () => {
	const [addTxn, setAddTxn] = useState(false);
	const categories = useSelector((state) => state.categories);
	const userId = useSelector((state) => state.uid);
	const ts = useSelector((state) => state.transactions);
	const dispatch = useDispatch();
	var [transData, setTransData] = useState(ts);
	const [curRow, setCurRow] = useState('');
	const [detailTrans, setDetailTrans] = useState(false);

	const [txnForm, setTxnForm] = useState({
		amount: '',
		date: new Date().toISOString().split('T')[0],
		txnName: '',
		category: '',
	});

	const Backdrop = styled('div')`
		z-index: -1;
		position: fixed;
		right: 0;
		bottom: 0;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		-webkit-tap-highlight-color: transparent;
	`;
	const style = {
		width: 400,
		bgcolor: 'white',
		border: '2px solid #000',
		p: 2,
		px: 4,
		pb: 3,
		m: 1,
	};

	const handleAddTxn = async (e) => {
		e.preventDefault();

		const timestamp = new Date().toISOString();
		const newTransData = {
			transactions: {
				[timestamp]: {
					...txnForm,
					time: timestamp,
				},
			},
		};
		await setDoc(doc(db, 'users', userId), newTransData, { merge: true });
		let data = {
			...transData,
			[timestamp]: {
				...txnForm,
				time: timestamp,
			},
		};
		dispatch({
			type: 'txnAddStore',
			payload: data,
		});

		setTransData(data);

		setAddTxn(false);
		setTxnForm({
			amount: '',
			date: new Date().toISOString().split('T')[0],
			txnName: '',
			category: '',
		});
	};

	const deleteTran = async () => {
		delete transData[curRow];

		dispatch({
			type: 'txnAddStore',
			payload: transData,
		});
		await updateDoc(doc(db, 'users', userId), {
			transactions: deleteField(),
		});
		await setDoc(
			doc(db, 'users', userId),
			{
				transactions: transData,
			},
			{ merge: true }
		);
		setDetailTrans(false);
	};

	function formatDate(dateString) {
		const date = new Date(dateString);
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		return (
			date.getDate().toString().padStart(2, '0') +
			'-' +
			months[date.getMonth()] +
			'-' +
			date.getFullYear()
		);
	}

	return (
		<div className='transContainer'>
			<div className='txnHeader'>Transactions</div>
			<div className='txnButton' onClick={() => setAddTxn(true)}>
				Add An Expense
			</div>

			<ModalUnstyled
				className='modalStyle'
				aria-labelledby='unstyled-modal-title'
				aria-describedby='unstyled-modal-description'
				open={addTxn}
				onClose={() => {
					setAddTxn(false);
					setTxnForm({
						amount: '',
						date: new Date().toISOString().split('T')[0],
						txnName: '',
						category: '',
					});
				}}
				BackdropComponent={Backdrop}>
				<Box className='modalBoxStyle'>
					<div
						style={{
							fontSize: '24px',
							textAlign: 'center',
							fontWeight: '600',
							margin: '5px 0px 10px 0px',
						}}>
						Add an Expense
					</div>
					<form onSubmit={handleAddTxn}>
						<FormControl fullWidth style={{ marginTop: '10px' }}>
							<InputLabel id='demo-simple-select-label'>Category</InputLabel>
							<Select
								autoFocus
								required
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={txnForm.category}
								label='Category'
								margin='dense'
								size='small'
								onChange={(e) =>
									setTxnForm((prev) => {
										return {
											...prev,
											category: e.target.value,
										};
									})
								}>
								{categories.map((x) => (
									<MenuItem key={x} value={x}>
										{x}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							fullWidth
							required
							value={txnForm.txnName}
							onChange={(e) =>
								setTxnForm((prev) => {
									return {
										...prev,
										txnName: e.target.value,
									};
								})
							}
							label='Title'
							margin='dense'
							size='small'
						/>

						<TextField
							fullWidth
							required
							value={txnForm.date}
							onChange={(e) =>
								setTxnForm((prev) => {
									return {
										...prev,
										date: e.target.value,
									};
								})
							}
							margin='dense'
							type='date'
							label='Date'
							size='small'
						/>

						<TextField
							type='number'
							required
							value={txnForm.amount}
							onChange={(e) =>
								setTxnForm((prev) => {
									return {
										...prev,
										amount: e.target.value,
									};
								})
							}
							fullWidth
							label='Amount'
							margin='dense'
							size='small'
						/>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '10px',
							}}>
							<Button
								type='submit'
								variant='contained'
								color='success'
								style={{ width: '46%' }}>
								ADD
							</Button>
							<Button
								variant='outlined'
								color='error'
								onClick={() => {
									setAddTxn(false);
									setTxnForm({
										amount: '',
										date: new Date().toISOString().split('T')[0],
										txnName: '',
										category: '',
									});
								}}
								style={{ width: '46%' }}>
								Cancel
							</Button>
						</div>
					</form>
				</Box>
			</ModalUnstyled>

			<ModalUnstyled
				className='modalStyle'
				aria-labelledby='unstyled-modal-title'
				aria-describedby='unstyled-modal-description'
				open={detailTrans}
				onClose={() => setDetailTrans(false)}
				BackdropComponent={Backdrop}>
				<Box className='modalBoxStyle'>
					<div
						style={{
							fontSize: '24px',
							textAlign: 'center',
							fontWeight: '600',
							margin: '5px 0px 10px 0px',
						}}>
						Details of Transaction
					</div>
					<table className='detailsTxnTable'>
						<tbody>
							<tr>
								<td>Date:</td>
								<td>{transData[curRow]?.date}</td>
							</tr>
							<tr>
								<td>Category:</td>
								<td>{transData[curRow]?.category}</td>
							</tr>
							<tr>
								<td>Description:</td>
								<td>{transData[curRow]?.txnName}</td>
							</tr>
							<tr>
								<td>Amount:</td>
								<td>$ {transData[curRow]?.amount}</td>
							</tr>
						</tbody>
					</table>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: '20px',
						}}>
						<Button
							type='submit'
							variant='contained'
							color='success'
							style={{ width: '49%' }}>
							EDIT
						</Button>
						<Button
							type='submit'
							variant='contained'
							color='error'
							style={{ width: '49%' }}
							onClick={deleteTran}>
							DELETE
						</Button>
					</div>
					<Button
						variant='outlined'
						color='error'
						onClick={() => setDetailTrans(false)}
						style={{ width: '100%', marginTop: '10px' }}>
						CANCEL
					</Button>
				</Box>
			</ModalUnstyled>

			<TableContainer
				style={{ backgroundColor: 'white', paddingBottom: '50px' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Category</TableCell>
							<TableCell className='desCol'>Description</TableCell>
							<TableCell>Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transData &&
							Object.keys(transData)?.map((key) => (
								<TableRow
									onClick={() => {
										setCurRow(key);
										setDetailTrans(true);
									}}
									key={key}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell>
										<span style={{ whiteSpace: 'nowrap' }}>
											{formatDate(transData[key].date)}
										</span>
									</TableCell>
									<TableCell>{transData[key].category}</TableCell>
									<TableCell className='desCol'>
										{transData[key].txnName}
									</TableCell>
									<TableCell>{Number(transData[key].amount)}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
export default Transactions;
