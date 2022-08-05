import axios from "axios";
import { userValidation } from "./validations";

axios.defaults.withCredentials = true;

export const login = async (studentId, password) => {
  try {
    const result = await axios.post("http://localhost:8000/auth/login", {
      studentId: studentId,
      password: password,
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const result = await axios.post("http://localhost:8000/auth/logout");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verify = async () => {
  try {
    const result = await axios.get("http://localhost:8000/auth/verify");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const result = await axios.get("http://localhost:8000/auth");
    return result.data.data.users;
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
  degree
) => {
  try {
    const body = {
      studentId,
      password,
      major,
      name,
      role,
      degree,
      isCheckedIn: false,
    };
    if (!userValidation(body))
      throw Error("유효성 검사에서 통과하지 못했습니다.");
    const result = axios.post("http://localhost:8000/auth/register", body);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (id, properties) => {
  try {
    const body = properties;
    const result = axios.patch(`http://localhost:8000/auth/${id}`, body);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const resetCheckInAll = async () => {
  try {
    const result = await axios.patch("http://localhost:8000/auth/checkin");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const resetCheckInOne = async (id) => {
  try {
    const result = await axios.patch(
      `http://localhost:8000/auth/checkin/${id}`
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
