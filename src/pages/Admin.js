import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
	Box,
	Container,
	CircularProgress,
	Card,
	Button,
	Modal,
	Fade,
	Backdrop,
} from '@mui/material';

import SlideshowIcon from '@mui/icons-material/Slideshow';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import styled from '@emotion/styled';

import ButtonAppBar from '../components/common/ButtonAppBar';
import StickyFooter from '../components/common/StickyFooter';

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
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 100%;
	margin: auto;
`;

const StyledCard = styled(Card)`
	border-radius: 15px;
	padding-top: 50px;
	padding-bottom: 50px;
	padding-left: 80px;
	padding-right: 80px;
	text-align: center;
`;

const ButtonDiv = styled(Container)`
	display: flex;
	flex-direction: row;
    justify-content: center;
`;

const StyledButton = styled(Button)`
	border-radius: 8px;
    flex: 1 1 0px;
    padding: 10px;
    margin: 0 40px;
`;

export default function User() {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// fetch(`/api/users/${id}`)
		//     .then(res => res.json())
		//     .then(data => {
		//         setUser(data);
		//         setLoading(false);
		//     });
		setUser({
			id: id,
			name: '강동헌',
			studentId: '123456789',
			major: '글로벌경영학과',
		});
		setLoading(false);
	}, [id]);

	return (
		<MainDiv>
			<ButtonAppBar />

			<InnerDiv>
				<ButtonDiv>
					<StyledButton
						variant="contained"
						size="large"
						startIcon={<SlideshowIcon />}
					>
						Presentation
					</StyledButton>
					<StyledButton
						variant="contained"
						size="large"
						startIcon={<QrCodeScannerIcon />}
					>
						QR Scanner
					</StyledButton>
				</ButtonDiv>
				{loading ? <CircularProgress /> : <StyledCard></StyledCard>}
			</InnerDiv>
			<StickyFooter />
		</MainDiv>
	);
}