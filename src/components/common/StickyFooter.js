import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{'Copyright ©'}
			<Link color="inherit" href="https://mui.com/">
				성균관대학교 스꾸디
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function StickyFooter() {
	return (
		<Box
			component="footer"
			sx={{
				py: 3,
				px: 2,
				backgroundColor: (theme) =>
					theme.palette.mode === 'light'
						? theme.palette.grey[200]
						: theme.palette.grey[800],
			}}
		>
			<Container>
				<Typography variant="body1">
					Made with ❤️ by 성균관대학교 스꾸디
				</Typography>
				<Copyright />
			</Container>
		</Box>
	);
}
