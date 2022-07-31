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

import LogoutIcon from '@mui/icons-material/Logout';
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

const StyledCardName = styled.p`
	font-weight: bolder;
	font-size: 1.7rem;
	margin-bottom: 0;
	margin-top: 10px;
`;

const StyledCardMajor = styled.p`
	font-weight: lighter;
	font-size: 1.2rem;
	margin-top: 1px;
	padding-top: 0;
`;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const StyledButton = styled(Button)`
	border-radius: 8px;
`;

export default function User() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	useEffect(() => {
		// fetch(`/api/users/${id}`)
		//     .then(res => res.json())
		//     .then(data => {
		//         setUser(data);
		//         setLoading(false);
		//     });
		setUser({
			id: '2021311965',
			name: '강동헌',
			studentId: '123456789',
			major: '글로벌경영학과',
		});
		setLoading(false);
	}, []);

	return (
		<MainDiv>
			<ButtonAppBar />

			<InnerDiv>
				{loading ? (
					<CircularProgress />
				) : (
					<StyledCard>
						<QRCodeSVG value={user.id} />
						<br />
						<Button onClick={handleOpen}>QR 크게하기</Button>

						<Modal
							open={modalOpen}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							<Fade in={modalOpen}>
								<Box sx={style}>
									<QRCodeSVG size={480} value={user.id} />
									<Button
										onClick={handleClose}
										size="large"
										sx={{ marginTop: 2 }}
									>
										나가기
									</Button>
								</Box>
							</Fade>
						</Modal>

						<StyledCardName variant="h3">{user.name}</StyledCardName>
						<StyledCardMajor variant="h5">{user.major}</StyledCardMajor>
						<StyledButton
							variant="contained"
							size="large"
							startIcon={<LogoutIcon />}
						>
							나가기
						</StyledButton>
					</StyledCard>
				)}
			</InnerDiv>
			<StickyFooter />
		</MainDiv>
	);
}
