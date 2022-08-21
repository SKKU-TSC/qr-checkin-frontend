import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';

import { UserContext } from '../../context/user';

import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Button,
	Box,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function ButtonAppBar() {
	const { userState, setUserState } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		await setUserState(false);
		navigate('/');
	};

	return (
		<Box>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, fontWeight: 'bolder' }}
						>
							SKKU QR
						</Typography>
						{userState ? (
							<Button
								color="inherit"
								startIcon={<LogoutIcon />}
								onClick={() => {
									handleLogout();
								}}
							>
								로그아웃
							</Button>
						) : (
							<Button
								color="inherit"
								startIcon={<LoginIcon />}
								onClick={() => navigate('/login')}
							>
								로그인
							</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
