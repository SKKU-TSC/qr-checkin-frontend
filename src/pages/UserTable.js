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

export default function User() {
	const { id } = useParams();
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

			<InnerDiv>{loading ? <CircularProgress /> : <h1>Hi</h1>}</InnerDiv>
			<StickyFooter />
		</MainDiv>
	);
}
