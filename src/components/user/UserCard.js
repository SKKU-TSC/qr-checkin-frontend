import { useState, useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Card, Button, Modal, Fade, Backdrop } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import styled from '@emotion/styled';
import exportAsImage from '../../hooks/exportAsImage';

const StyledCard = styled(Card)`
	padding-top: 50px;
	padding-bottom: 50px;
	padding-left: 40px;
	padding-right: 40px;
	text-align: center;
	border-radius: 16px;

	//media query
	@media (max-width: 600px) {
		padding-left: 20px;
		padding-right: 20px;
	}
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
	wstudentIdth: 600,
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
	margin: 0 5px;
`;

const StyledQRCodeCanvas = styled(QRCodeCanvas)`
	border-radius: 25px;
`;

function downloadBlob(blob, filename) {
	const objectUrl = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = objectUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

export default function UserCard(props) {
	const [modalOpen, setModalOpen] = useState(false);

	const canvasRef = useRef();

	const downloadSVG = useCallback(() => {
		const svg = canvasRef.current.innerHTML;
		const img = svg.toDataURL('image/png');
		downloadBlob(img, `myimage.png`);
	}, []);

	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	return (
		<StyledCard ref={canvasRef}>
			<StyledQRCodeCanvas
				value={props.user.studentId}
				size={200}
				bgColor={'#ffffff'}
				fgColor={'#000000'}
				level={'L'}
				includeMargin={true}
			/>
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
						<div>
							<StyledQRCodeCanvas
								value={props.user.studentId}
								size={400}
								bgColor={'#ffffff'}
								fgColor={'#000000'}
								level={'L'}
								includeMargin={true}
							/>
						</div>

						<Button onClick={handleClose} size="large" sx={{ marginTop: 2 }}>
							나가기
						</Button>
					</Box>
				</Fade>
			</Modal>

			<StyledCardName variant="h3">{props.user.name}</StyledCardName>
			<StyledCardMajor variant="h5">{props.user.major}</StyledCardMajor>
			<StyledButton
				variant="contained"
				size="large"
				startIcon={<DownloadIcon />}
				onClick={() => {
					exportAsImage(
						canvasRef.current,
						`${props.user.name}_${props.user.studentId}`
					);
				}}
			>
				다운 받기
			</StyledButton>

			<StyledButton variant="outlined" size="large" startIcon={<LogoutIcon />}>
				로그아웃
			</StyledButton>
		</StyledCard>
	);
}
