import CircularProgress from '@mui/material/CircularProgress';

const muiLoader = () => {
	return (
		<div
			style={{
				background: 'rgba(51, 170, 51, .1)',
				position: 'absolute',
				top: '0px',
				left: '0px',
				height: '100vh',
				width: '100%',
			}}>
			<CircularProgress />
		</div>
	);
};
