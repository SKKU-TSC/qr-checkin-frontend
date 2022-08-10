import { Container } from '@mui/material';
import styled from '@emotion/styled';

import ButtonAppBar from '../components/common/ButtonAppBar';
import UserTable from '../components/admin/AdminTable';

const MainDiv = styled(Container)`
	margin: 0 !important;
	padding: 0 !important;
	max-width: none !important;
	min-height: 100vh !important;
	display: flex;
	flex-direction: column;
	flex-grow: 0;
`;

const InnerDiv = styled(Container)`
	padding-top: 25px;
	padding-bottom: 25px;
`;

export default function User() {
	return (
		<MainDiv>
			<ButtonAppBar />

			<InnerDiv>
				<div>
					<UserTable />
				</div>
			</InnerDiv>
		</MainDiv>
	);
}
