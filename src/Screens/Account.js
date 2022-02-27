import { useState } from 'react';
import { useSelector } from 'react-redux';
const Account = () => {
	const data = useSelector((state) => state);
	// console.log(data);
	const [edit, setEdit] = useState(false);
	const [newUname, setNewUname] = useState(data.uname);
	const [newCur, setNewCur] = useState(data.currency);
	return (
		<div className='account'>
			<div className='accountHeader'>Account Details</div>
			<div className='test001'>
				<table className='accountTable'>
					<tbody>
						<tr>
							<td>User&nbsp;Name:</td>
							{!edit ? (
								<td>{data.uname}</td>
							) : (
								<td>
									<input
										className='inputAccount'
										autoFocus
										value={newUname}
										onChange={(e) => setNewUname(e.target.value)}
									/>
								</td>
							)}
						</tr>
						<tr>
							<td>Currency:</td>
							{!edit ? (
								<td>{data.currency}</td>
							) : (
								<td>
									<input
										value={newCur}
										className='inputAccount'
										onChange={(e) => setNewCur(e.target.value)}
									/>
								</td>
							)}
						</tr>
						<tr>
							<td>Email:</td>
							<td>{data.email}</td>
						</tr>
					</tbody>
				</table>
			</div>
			{!edit && <button onClick={() => setEdit(true)}>Edit</button>}
			{edit && <button onClick={() => setEdit(false)}>Cancel</button>}
			{newCur + ' ' + newUname}
		</div>
	);
};
export default Account;
