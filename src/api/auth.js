import axios from "axios";

axios.defaults.withCredentials = true;

export const login = async (studentId, password) => {
  try {
    const result = await axios.post("/api/auth/login", {
      studentId: studentId,
      password: password,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    console.log("로그아웃중");
    const result = await axios.post("/api/auth/logout");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
