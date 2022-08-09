import { Button, Modal, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

function setWithExpiry(key, value) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getDate(),
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getDate > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export default function Popup() {
	const [open, setOpen] = useState(true);
	const handleOpen = () => setOpen(true);
    const handleClose = () => {
        // store the current state of the popup
        setWithExpiry('popup', open)
        setOpen(false)
    };

    useEffect(() => {
        // get the state of the popup from storage
        const popup = getWithExpiry('popup')
        if (popup) {
            setOpen(false)
        }
    } , [])

	return (
		<>
			<Modal
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						📌 공지사항
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        당일 혼잡한 관계로 인터넷 연결이 불안정 할 수 있습니다.
                        <br />
                        <br />
                        인터넷 연결이 불안정할 경우 LTE를 이용해주세요.
                        <br />
                        <br />
                        <Button variant="contained" onClick={handleClose}>오늘 하루동안 열지 않기</Button>
					</Typography>
				</Box>
			</Modal>
		</>
	);
}
