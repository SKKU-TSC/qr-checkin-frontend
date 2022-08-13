import axios from "axios";

axios.defaults.withCredentials = true;

export const login = async (studentId, password) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,

      {
        studentId: studentId,
        password: password,
      }
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/logout`
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verify = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/verify`
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
