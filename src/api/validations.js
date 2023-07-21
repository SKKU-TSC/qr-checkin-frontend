import { getAllUsers } from "./users";

export const userValidation = async (body) => {
  //1. 학번이 유일한지 확인
  if (body.studentId) {
    const users = await getAllUsers();
    users.forEach((user) => {
      if (user.studentId === body.studentId) {
        alert("학번이 중복되었습니다.");
        return false;
      }
    });
  }
  //2. degree와 role 유효성 검사
  if (body.degree) {
    if (["Bachelor", "Master", "Doctor", "Admin"].indexOf(body.degree) < 0) {
      alert("학위는 Bachelor, Master, Doctor, Admin 중 하나가 되어야 합니다.");
      return false;
    }
  }
  if (body.role) {
    if (["Client", "Admin"].indexOf(body.role) < 0) {
      alert("역할은 Client, Admin 중 하나가 되어야 합니다.");
      return true;
    }
  }
  //3. 통과시 true를 반환
  return true;
};
