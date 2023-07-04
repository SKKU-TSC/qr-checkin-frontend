import { userValidation } from './validations';
import axios from 'axios';

export const getAllUsers = async () => {
	try {
		await axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
			return res.data;
		});
	} catch (error) {
		throw new Error(error.message);
	}
};

export const getOneUser = async (studentId) => {
	try {
		await axios
			.get(`${process.env.REACT_APP_API_URL}/users/${studentId}`)
			.then((res) => {
				return res.data;
			});
	} catch (error) {
		throw new Error(error.message);
	}
};

export const addUser = async (
	studentId,
	password,
	major,
	name,
	role,
	degree,
	comment
) => {
	try {
		const body = {
			studentId,
			password,
			major,
			name,
			role,
			degree,
			comment,
		};
		if (!userValidation(body))
			throw Error('유효성 검사에서 통과하지 못했습니다.');
		await axios
			.post(`${process.env.REACT_APP_API_URL}/users`, body)
			.then((res) => {
				return res.data;
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const getUser = async (studentId) => {
	try {
    await axios.get(`${process.env.REACT_APP_API_URL}/users/${studentId}`).then((res) => {
      return res.data;
    });
	} catch (error) {
		throw new Error(error.message);
	}
};

export const updateUser = async (id, properties) => {
	try {
    const body = properties;
    await axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}`, body).then((res) => {
      return res.data;
    });
	} catch (error) {
		throw new Error(error.message);
	}
};
