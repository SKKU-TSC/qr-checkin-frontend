import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styled from '@emotion/styled';

const LogoImage = styled.img`
	//make image center and transparent
	position: absolute;
	opacity: 0.5;
	z-index: 1;
`;

const MainContainer = styled.div`
	height: 100vh;
	display: flex;
	background-color: white;
	flex-direction: column;
    padding-left: 100px;
	align-items: flex-start;
	align-content: center;
	justify-content: center;
	z-index: -1;
`;

const Name = styled.h1`
	font-size: 5rem;
	font-weight: bolder;
	letter-spacing: 0.4rem;
	z-index: 2;
	margin-top: 0;
	color: #50c401;
`;

const Major = styled.h2`
	font-size: 2.5rem;
	letter-spacing: 0.5rem;
	margin-top: -10px;
	z-index: 2;
	background: -webkit-linear-gradient(
		rgba(80, 196, 1, 1) 0%,
		rgba(120, 195, 20, 1) 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const Degree = styled.h3`
	font-size: 1.5rem;
	letter-spacing: 0.5rem;
	margin-top: -10px;
	z-index: 2;
	background: -webkit-linear-gradient(
		90deg,
		rgba(127, 195, 23, 1) 0%,
		rgba(142, 195, 30, 1) 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const socket = io.connect('http://localhost:8001', {
	withCredentials: true,
	extraHeaders: {
		'my-custom-header': 'abcd',
	},
});

export default function Presentation(params) {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [data, setData] = useState(null);

	useEffect(() => {
		const handler = (data) => {
			setData(data);
			console.log(data);
		};
		socket.on('connect', () => {
			setIsConnected(true);
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
		});

		socket.on('display', handler);

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('pong');
		};
	}, []);

	return (
		<MainContainer>
			{isConnected ? (
				<>
					<Name>{data?.name}</Name>
					<Major>{data?.major}</Major>
					<Degree>학사</Degree>
				</>
			) : (
				<div>
					<h1>Not connected</h1>
				</div>
			)}
		</MainContainer>
	);
}
