import './screens.css';
import { Table, Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from '../Data/mockdata.json';

function Transactions() {
	return (
		<Container className='transactionContainer'>
			<Row>
				<Col xs={12}>
					<div className='addButton'>ADD EXPENSE</div>
				</Col>
			</Row>
			<Row>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{Data.map((x) => (
							<tr key={x.des}>
								<td>{x.date}</td>
								<td>
									{x.des.length > 25
										? x.des.substring(0, 25).concat('...')
										: x.des}
								</td>
								<td>{x.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Row>
		</Container>
	);
}
export default Transactions;
