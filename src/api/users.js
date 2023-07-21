import { userValidation } from "./validations";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOneUser = async (studentId) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${studentId}`
    );
    return result.data;
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
      throw Error("유효성 검사에서 통과하지 못했습니다.");
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users`,
      body
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (studentId) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${studentId}`
    );
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (id, properties) => {
  try {
    const body = properties;
    const result = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      body
    );
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
