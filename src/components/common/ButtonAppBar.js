import * as React from 'react';
import {
	AppBar,
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
import { useState } from 'react';



const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function ButtonAppBar(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

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

	return (
		<Box>
			<AppBar position="static">
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
						SKKU QR Check In
					</Typography>
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<LogoutIcon />}
              onClick={() => setIsLoggedIn(false)}
            >
              로그아웃
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<LoginIcon />}
              onClick={() => setIsLoggedIn(true)}
              >
                로그인
            </Button>
          )}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
