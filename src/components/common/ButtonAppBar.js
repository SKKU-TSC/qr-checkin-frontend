import * as React from 'react';
import {
  AppBar,
  Container,
	Toolbar,
	Typography,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Divider,
	Box,
	ListItemText,
	Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify, logout } from '../../api/auth';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function ButtonAppBar(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navigate = useNavigate();

	const handleDrawer = (open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setDrawerOpen(open);
	};

	const drawer = (
		<Box
			onClick={handleDrawer(false)}
			onKeyDown={handleDrawer(false)}
			sx={{ textAlign: 'center', width: drawerWidth }}
		>
			<Typography variant="h6" sx={{ my: 2 }}>
				SKKU QR Check In
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	useEffect(() => {
		verify()
			.then(() => setIsLoggedIn(true))
			.catch(() => setIsLoggedIn(false));
	});

	return (
		<Box>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={handleDrawer(true)}
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Drawer
							anchor={'left'}
							open={drawerOpen}
							onClose={handleDrawer(false)}
						>
							{drawer}
						</Drawer>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							SKKU QR
						</Typography>
						{isLoggedIn ? (
							<Button
								color="inherit"
								startIcon={<LogoutIcon />}
								onClick={() => {
									logout();
									navigate('/');
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
