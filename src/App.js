import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { verify } from "../src/api/auth";

// Context
import { SocketContext, socket } from "./context/socket";
import { UserContext } from "./context/user";

// importing pages
import Main from "./pages/Main";
import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
import UserTable from "./pages/UserTable";
import QRReader from "./pages/QRReader";
import Presentation from "./pages/Presentation";
import UserFormPage from "./pages/UserFormPage";

function App() {
  const [userState, setUserState] = useState(false);
  const value = useMemo(() => ({ userState, setUserState }), [userState]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#006828",
            contrastText: "rgba(255,255,255,0.87)",
          },
          secondary: {
            main: "#d4af37",
            contrastText: "rgba(0,0,0,0.87)",
          },
        },
        typography: {
          fontFamily: '"Noto Sans KR", sans-serif',
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    verify()
      .then(({ data: { data } }) => {
        setUserState(data.role);
      })
      .catch(() => setUserState(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={value}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="login" element={<Login />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="admin" element={<Admin />} />
              <Route path="admin/usertable" element={<UserTable />} />
              <Route path="admin/userform" element={<UserFormPage />} />
              <Route path="admin/userform/:id" element={<UserFormPage />} />
              <Route path="admin/qrreader" element={<QRReader />} />
              <Route path="admin/presentation" element={<Presentation />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default App;
