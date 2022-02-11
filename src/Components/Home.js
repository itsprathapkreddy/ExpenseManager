import { useSelector } from 'react-redux';
const Home = () => {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	return (
		<>
			<h1>You are already Logged in.</h1>
			<h2>Go to DashBoard</h2>
		</>
	);
};
export default Home;
