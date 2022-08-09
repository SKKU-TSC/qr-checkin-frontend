import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { SocketContext, socket } from "./context/socket";
import { verify } from "../src/api/auth";

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
  const [userState, setUserState] = useState(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
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
      .then(({ data: { data } }) => setUserState(data))
      .catch(() => setUserState(null));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Main userState={userState} setUserState={setUserState} />
              }
            />
            <Route
              path="login"
              element={
                <Login userState={userState} setUserState={setUserState} />
              }
            />
            <Route
              path="user"
              element={
                <User userState={userState} setUserState={setUserState} />
              }
            >
              <Route
                path=":userId"
                element={
                  <User userState={userState} setUserState={setUserState} />
                }
              />
            </Route>
            <Route
              path="admin"
              element={
                <Admin userState={userState} setUserState={setUserState} />
              }
            />
            <Route
              path="admin/usertable"
              element={
                <UserTable userState={userState} setUserState={setUserState} />
              }
            />
            <Route
              path="admin/userform"
              element={
                <UserFormPage
                  userState={userState}
                  setUserState={setUserState}
                />
              }
            />
            <Route
              path="admin/userform/:id"
              element={
                <UserFormPage
                  userState={userState}
                  setUserState={setUserState}
                />
              }
            />
            <Route
              path="admin/qrreader"
              element={
                <QRReader userState={userState} setUserState={setUserState} />
              }
            />
            <Route path="admin/presentation" element={<Presentation />} />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default App;
