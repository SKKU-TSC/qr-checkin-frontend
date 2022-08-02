import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styled from '@emotion/styled';

const MainContainer = styled.div`
	height: 100vh;
	background-color: #1f321c;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		opacity: 0.1;
		//use background image
		background-image: url('/Emblem.png');
		background-repeat: no-repeat;
		background-size: 700px;
		background-position: center;
	}
`;

const Name = styled.h1`
	font-size: 11rem;
	font-weight: bolder;
	letter-spacing: 0.4rem;
	z-index: 2;
	margin-top: 0;
	margin-bottom: 0;
`;

const Major = styled.h2`
	font-size: 5rem;
	letter-spacing: 0.5rem;
	font-weight: 600;
	z-index: 2;
	margin-top: 0;
	margin-bottom: 0;
	padding-bottom: 0;
`;

const Degree = styled.h3`
	font-size: 4rem;
	letter-spacing: 0.5rem;
	z-index: 2;
	margin-bottom: 0;
	padding-bottom: 0;
`;

const BottomLogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	justify-content: space-evenly;
	padding-bottom: 10px;
`;

const Bottom = styled.div`
	position: absolute;
	bottom: 0;
	width: 100vw;
`;

const Logo1 = styled.h1`
	font-weight: 600;
	font-size: 30px;
`;

const Logo2 = styled.img`
	width: 250px;
	height: auto;
	object-fit: contain;
`;

const Logo3 = styled.h1`
	font-weight: 400;
`;

const socket = io.connect('http://localhost:8000', {
	withCredentials: true,
	cors: { origin: '*' },
	extraHeaders: {
		'my-custom-header': 'abcd',
	},
});

export default function Presentation() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [data, setData] = useState({name: "강동헌", major: "글로벌경영학과", degree: "학사"});

	useEffect(() => {
		socket.on('connect', () => {
			setIsConnected(true);
			console.log('connect');
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
		});

		socket.on('display', (data) => {
			setData(data);
			console.log('wang');
		});

		// return () => {
		// 	socket.off('connect');
		// 	socket.off('disconnect');
		// };
	}, []);

	return (
		<MainContainer>
			{isConnected ? (
				<>
					<Name>{data?.name}</Name>
					<Major>{data?.major}</Major>
					<Degree>{data?.degree}</Degree>
				</>
			) : (
				<div>
					<h1>Not connected</h1>
				</div>
			)}
			<Bottom>
				<BottomLogoContainer>
					<Logo1>2022 여름 학위수여식</Logo1>
					<Logo2 src="/school_logo.png" />
					<Logo3>Logo 2</Logo3>
				</BottomLogoContainer>
			</Bottom>
		</MainContainer>
	);
}
