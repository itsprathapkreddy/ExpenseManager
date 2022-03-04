import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const Overview = () => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.uid);
	const state = useSelector((state) => state);
	const [catValues, setCatValues] = useState([]);
	const [cats, setCats] = useState([]);
	const amountArr = {};

	const colorArray = [
		'rgba(255, 99, 132, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)',
		'#FF6633',
		'#FFB399',
		'#FF33FF',
		'#FFFF99',
		'#00B3E6',
		'#E6B333',
		'#3366E6',
		'#999966',
		'#99FF99',
		'#B34D4D',
		'#80B300',
		'#809900',
		'#E6B3B3',
		'#6680B3',
		'#66991A',
		'#FF99E6',
		'#CCFF1A',
		'#FF1A66',
		'#E6331A',
		'#33FFCC',
		'#66994D',
		'#B366CC',
		'#4D8000',
		'#B33300',
		'#CC80CC',
		'#66664D',
		'#991AFF',
		'#E666FF',
		'#4DB3FF',
		'#1AB399',
		'#E666B3',
		'#33991A',
		'#CC9999',
		'#B3B31A',
		'#00E680',
		'#4D8066',
		'#809980',
		'#E6FF80',
		'#1AFF33',
		'#999933',
		'#FF3380',
		'#CCCC00',
		'#66E64D',
		'#4D80CC',
		'#9900B3',
		'#E64D66',
		'#4DB380',
		'#FF4D4D',
		'#99E6E6',
		'#6666FF',
	];
	useEffect(() => {
		Object.keys(state.transactions).map((x) => {
			if (amountArr[state.transactions[x].category] === undefined)
				amountArr[state.transactions[x].category] = 0;
			amountArr[state.transactions[x].category] += Number(
				state.transactions[x].amount
			);
			setCatValues(Object.values(amountArr));
			setCats(Object.keys(amountArr));
		});
	}, []);

	const data = {
		labels: cats,
		datasets: [
			{
				label: '# of Votes',
				data: catValues,
				backgroundColor: colorArray,
				borderColor: colorArray,
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='overview'>
			<div className='overviewHeader'>Overview</div>
			<Grid container>
				<Grid
					item
					md={4}
					style={{ backgroundColor: 'white', width: '100%', padding: '10px' }}>
					<Doughnut width='100%' data={data} />
				</Grid>
				<Grid item md={8} style={{ backgroundColor: 'red' }}>
					{/* <h1>jfhsk fweh w jkr fwi j</h1> */}
				</Grid>
			</Grid>
		</div>
	);
};
export default Overview;
