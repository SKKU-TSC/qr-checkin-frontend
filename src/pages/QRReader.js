import { useEffect, useState, useRef } from 'react';
import { ReactDOM } from 'react';
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
import { QrReader } from '@blackbox-vision/react-qr-reader';
import io from 'socket.io-client';

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
	margin: auto;
`;

const socket = io.connect('http://localhost:8000', {
	withCredentials: true,
	extraHeaders: {
		'my-custom-header': 'abcd',
	},
});

export default function QRReader() {
	const delay = 1000;

	const previewStyle = {
		height: 10,
		width: 320,
	};

	const [lastResult, setLastResult] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	let lastResultRef = null;

	const handleScan = (result, error) => {
		if (lastResultRef === result?.text) {
			return;
		}

		if (!!result) {
			setLastResult(result?.text);
			console.log('send fetch');
			lastResultRef = result?.text;
			socket.emit('displaySet', result?.text);
		}

		if (!!error) {
			console.info(error);
		}
	};

	useEffect(() => {
		socket.on('connect', () => {
			setIsConnected(true);
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('displaySet');
		};
	});

	return (
		<MainDiv>
			<ButtonAppBar />
			<div id="qr-reader">
				<QrReader
					scanDelay={delay}
					style={previewStyle}
					onResult={handleScan}
					constraints={{ facingMode: 'user' }}
				/>
			</div>
			{lastResult}
			<StickyFooter />
		</MainDiv>
	);
}
