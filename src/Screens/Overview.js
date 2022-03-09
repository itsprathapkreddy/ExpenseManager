import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import Grid from '@mui/material/Grid';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	LineElement,
	Title,
	Tooltip,
	ArcElement,
	Legend,
} from 'chart.js';

import { Doughnut, Line, Bar } from 'react-chartjs-2';
ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	BarElement,
	LinearScale,
	PointElement,
	LineElement,
	Title
);
const Overview = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const ts = state.transactions;
	const userId = state.uid;
	const [catValues, setCatValues] = useState([]);
	const [cats, setCats] = useState([]);
	const [dateRange, setDateRange] = useState([]);
	const amountArr = {};
	const [lineData, setLineData] = useState({
		keys: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
			22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		values: [],
	});
	const [barData, setBarData] = useState([]);
	const [dropMonth, setDropMonth] = useState();

	const borderColorArray = [
		'rgba(255, 99, 132, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)',
		'rgba(255,102,51,1)',
		'rgba(255,179,153,1)',
		'rgba(255,51,255,1)',
		'rgba(255,255,153,1)',
		'rgba(0,179,230,1)',
		'rgba(230,179,51,1)',
		'rgba(51,102,230,1)',
		'rgba(153,153,102,1)',
		'rgba(153,255,153,1)',
		'rgba(179,77,77,1)',
		'rgba(128,179,0,1)',
		'rgba(128,153,0,1)',
		'rgba(230,179,179,1)',
		'rgba(102,128,179,1)',
		'rgba(102,153,26,1)',
		'rgba(255,153,230,1)',
		'rgba(204,255,26,1)',
		'rgba(255,26,102,1)',
		'rgba(230,51,26,1)',
		'rgba(51,255,204,1)',
		'rgba(102,153,77,1)',
		'rgba(179,102,204,1)',
		'rgba(77,128,0,1)',
		'rgba(179,51,0,1)',
		'rgba(204,128,204,1)',
		'rgba(102,102,77,1)',
		'rgba(153,26,255,1)',
		'rgba(230,102,255,1)',
		'rgba(77,179,255,1)',
		'rgba(26,179,153,1)',
		'rgba(230,102,179,1)',
		'rgba(51,153,26,1)',
		'rgba(204,153,153,1)',
		'rgba(179,179,26,1)',
		'rgba(0,230,128,1)',
		'rgba(77,128,102,1)',
		'rgba(128,153,128,1)',
		'rgba(230,255,128,1)',
		'rgba(26,255,51,1)',
		'rgba(153,153,51,1)',
		'rgba(255,51,128,1)',
		'rgba(204,204,0,1)',
		'rgba(102,230,77,1)',
		'rgba(77,128,204,1)',
		'rgba(153,0,179,1)',
		'rgba(230,77,102,1)',
		'rgba(77,179,128,1)',
		'rgba(255,77,77,1)',
		'rgba(153,230,230,1)',
		'rgba(102,102,255,1)',
	];
	useEffect(() => {
		console.log(state);

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

	const PieChartdata = {
		labels: cats,
		datasets: [
			{
				label: '# of Votes',
				data: catValues,
				backgroundColor: borderColorArray,
				borderColor: 'white',
				borderWidth: 2,
			},
		],
	};
	const lineChartData = {
		labels: lineData.keys,
		datasets: [
			{
				label: 'My First Dataset',
				data: lineData.values,
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.2,
			},
		],
	};
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Bar Chart',
			},
		},
	};

	useEffect(() => {
		let months = [
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
		const yearMonObj = {};
		dateRange.map((x) => (yearMonObj[x] = Number(0)));
		Object.keys(ts).map((x) => {
			let y = ts[x].date.substr(0, 4);
			let m = ts[x].date.substr(5, 2);
			yearMonObj[months[Number(m) - 1] + ' ' + y] += Number(ts[x].amount);
		});
		// console.log(yearMonObj);
		setBarData(dateRange.map((x) => yearMonObj[x]));
	}, [dateRange]);

	const barChartData = {
		labels: dateRange.map((x) => x),
		datasets: [
			{
				label: 'Dataset 1',
				data: barData,
				backgroundColor: borderColorArray,
			},
		],
	};

	useEffect(() => {
		const dates = Object.keys(ts)
			.map((x) => ts[x].date)
			.map((x) => new Date(x.replace(/-/g, '/')));

		const maxDate = new Date(Math.max(...dates));
		const minDate = new Date(Math.min(...dates));

		let tempArr = [];

		const maxMonth = maxDate.getMonth();
		const maxYear = maxDate.getFullYear();
		const minMonth = minDate.getMonth();
		const minYear = minDate.getFullYear();
		let months = [
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
		for (let i = minYear; i <= maxYear; i++) {
			for (let j = 0; j <= 11; j++) {
				if (i === minYear && j >= minMonth) tempArr.push(months[j] + ' ' + i);
				else if (i === maxYear && j <= maxMonth)
					tempArr.push(months[j] + ' ' + i);
			}
		}
		setDateRange(tempArr);
		// handleOverview({ e: { target: { value: 'Mar 2022' } } });
	}, []);
	const handleOverview = (e) => {
		let months = [
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

		const cM = months.indexOf(e.target.value.split(' ')[0]);
		const cY = Number(e.target.value.split(' ')[1]);
		let tempObj = {};
		let tempDayObj = {};
		lineData.keys.map((x) => (tempDayObj[x] = 0));
		Object.keys(ts).map((x) => {
			if (
				new Date(ts[x].date.replace(/-/g, '/')).getMonth() === cM &&
				new Date(ts[x].date.replace(/-/g, '/')).getFullYear() == cY
			) {
				if (tempObj[ts[x].category] === undefined)
					tempObj[ts[x].category] = Number(ts[x].amount);
				else tempObj[ts[x].category] += Number(ts[x].amount);
				if (tempDayObj[ts[x].date.slice(-2)] === undefined)
					tempDayObj[Number(ts[x].date.slice(-2))] = Number(ts[x].amount);
				else tempDayObj[Number(ts[x].date.slice(-2))] += Number(ts[x].amount);
			}
		});

		let testArr = lineData.keys.map((x) => tempDayObj[x]);
		setLineData((prev) => {
			return { keys: prev.keys, values: testArr };
		});
		setCatValues(Object.values(tempObj));
		setCats(Object.keys(tempObj));
	};

	return (
		<div className='overview'>
			<div className='overviewHeader'>
				Overview
				<select
					name='carsd'
					onChange={(e) => {
						handleOverview(e);
					}}>
					<option value=''>Select</option>
					{dateRange.map((x) => (
						<option value={x}>{x}</option>
					))}
				</select>
			</div>
			<Grid container>
				<Grid
					item
					md={4}
					style={{
						backgroundColor: '#f8f8ff',
						width: '100%',
						padding: '10px',
					}}>
					<Doughnut width='100%' data={PieChartdata} />
				</Grid>
				<Grid
					item
					md={8}
					style={{
						backgroundColor: '#fffafa',
						width: '100%',
					}}>
					<Line style={{ minHeight: '300px' }} data={lineChartData} />
				</Grid>
				<Grid
					item
					md={12}
					style={{
						backgroundColor: '#f0fff0',
						width: '100%',
						textAlign: 'center',
					}}>
					<Bar
						style={{ height: '300px' }}
						option={options}
						data={barChartData}
					/>
				</Grid>
			</Grid>
		</div>
	);
};
export default Overview;
