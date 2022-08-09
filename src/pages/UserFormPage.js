import React from "react";
import UserForm from "../components/admin/UserForm";
import ButtonLabel from "../components/common/ButtonAppBar";
import StickyFooter from "../components/common/StickyFooter";

export default function UserFormPage({ userState, setUserState }) {
  return (
    <>
      <ButtonLabel userState={userState} setUserState={setUserState} />
      <UserForm userState={userState} setUserState={setUserState} />
      <StickyFooter />
    </>
  );
}
