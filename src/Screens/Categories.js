import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { db } from '../Auth/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Categories = () => {
	const userId = useSelector((state) => state.uid);
	const [categories, setCategories] = useState(
		useSelector((state) => state.categories)
	);
	const [newCatData, setNewCatData] = useState('');
	const dispatch = useDispatch();

	const addCat = async () => {
		console.log(newCatData);
		dispatch({
			type: 'catStore',
			payload: [...categories, newCatData],
		});

		await setDoc(
			doc(db, 'users', userId),
			{ categories: [...categories, newCatData] },
			{ merge: true }
		);
		setCategories((prev) => [...prev, newCatData]);
		setNewCatData('');
	};

	const removeCat = async (i) => {
		let temp = [...categories];
		temp.splice(i, 1);
		dispatch({
			type: 'catStore',
			payload: temp,
		});

		await setDoc(
			doc(db, 'users', userId),
			{ categories: temp },
			{ merge: true }
		);
		setCategories(temp);
	};
	return (
		<div className='categories'>
			<div className='categriesHeader'>Categories</div>

			<div className='categoryList'>
				<div className='catAddContainer'>
					<input
						value={newCatData}
						type='text'
						placeholder='Category Name'
						onChange={(e) => setNewCatData(e.target.value)}
					/>
					<button style={{ fontSize: '30px' }} onClick={addCat}>
						+
					</button>
				</div>
				<Grid container>
					{categories.map((x, i) => (
						<Grid item md={4} key={i} xs={12}>
							<div className='catItem'>
								{x}
								<span
									style={{ float: 'right', cursor: 'pointer' }}
									onClick={() => removeCat(i)}>
									X
								</span>
							</div>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
};
export default Categories;
