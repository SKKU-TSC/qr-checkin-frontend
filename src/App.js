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
import PageNotFound from "./pages/PageNotFound";

//importing routes
import ValidationRoute from "./utils/validationRoute";

function App() {
  const [userState, setUserState] = useState(
    JSON.parse(window.localStorage.getItem("userState")) || false
  ); //window.localStorage.getItem(KEY_이름)
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
    window.localStorage.removeItem("userState");
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      window.localStorage.setItem("userState", JSON.stringify(userState));
    });
  }, [userState]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={value}>
          <BrowserRouter>
            <Routes>
              {/*request에는 admin/client/false를 담는 리스트가 옵니다. */}
              <Route path="/" element={<ValidationRoute request={[false]} />}>
                <Route path="/" element={<Main />} />
              </Route>

              <Route
                path="/login"
                element={<ValidationRoute request={[false]} />}
              >
                <Route path="/login" element={<Login />} />
              </Route>

              <Route
                path="/user"
                element={<ValidationRoute request={["client", "admin"]} />}
              >
                <Route path="/user" element={<User />} />
              </Route>

              <Route
                path="/admin"
                element={<ValidationRoute request={["admin"]} />}
              >
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route
                path="/admin/usertable"
                element={<ValidationRoute request={["admin"]} />}
              >
                <Route path="/admin/usertable" element={<UserTable />} />
              </Route>

              <Route
                path="/admin/userform"
                element={<ValidationRoute request={["admin"]} />}
              >
                <Route path="/admin/userform" element={<UserFormPage />} />
              </Route>

              <Route
                path="/admin/userform/:id"
                element={<ValidationRoute request={["admin"]} />}
              >
                <Route path="/admin/userform/:id" element={<UserFormPage />} />
              </Route>

              <Route
                path="/admin/qrreader"
                element={<ValidationRoute request={["admin"]} />}
              >
                <Route path="/admin/qrreader" element={<QRReader />} />
              </Route>

              <Route
                path="/admin/presentation"
                element={<ValidationRoute request={["admin"]} />}
              >
                <Route path="/admin/presentation" element={<Presentation />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default App;
