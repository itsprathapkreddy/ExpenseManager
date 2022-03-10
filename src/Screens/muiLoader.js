import CircularProgress from '@mui/material/CircularProgress';

const MuiLoader = () => {
	return (
		<div
			style={{
				background: 'rgba(51, 170, 51, .1)',
				position: 'absolute',
				top: '0px',
				left: '0px',
				height: '100vh',
				width: '100%',
				zIndex: 1000,
			}}>
			<CircularProgress />
		</div>
	);
};
export default MuiLoader;
