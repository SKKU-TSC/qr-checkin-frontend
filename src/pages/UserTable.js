import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  Box,
  Container,
  CircularProgress,
  Card,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "@emotion/styled";

import ButtonAppBar from "../components/common/ButtonAppBar";
import StickyFooter from "../components/common/StickyFooter";
import UserTable from "../components/admin/AdminTable";
import UserForm from "../components/admin/UserForm";
import { logout } from "../api/auth";

const MainDiv = styled(Container)`
  margin: 0 !important;
  padding: 0 !important;
  max-width: none !important;
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;

const InnerDiv = styled(Container)`
  padding-top: 25px;
  padding-bottom: 25px;
`;

export default function User({ userState, setUserState }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setUser({
      id: id,
      name: "강동헌",
      studentId: "123456789",
      major: "글로벌경영학과",
    });
    setLoading(false);
  }, [id]);

  return (
    <MainDiv>
      <ButtonAppBar userState={userState} setUserState={setUserState} />

      <InnerDiv>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <UserTable />
          </div>
        )}
      </InnerDiv>
      <StickyFooter />
    </MainDiv>
  );
}
