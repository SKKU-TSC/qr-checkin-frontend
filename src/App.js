import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

// importing pages
import Main from "./pages/Main";
import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
import UserTable from "./pages/UserTable";
import QRReader from "./pages/QRReader";
import Presentation from "./pages/Presentation";

function App() {
	const [token, setToken] = useState();
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
					primary: {
						main: '#006828',
						contrastText: 'rgba(255,255,255,0.87)',
					},
					secondary: {
						main: '#d4af37',
						contrastText: 'rgba(0,0,0,0.87)',
					},
				},
				typography: {
					fontFamily: '"Noto Sans KR", sans-serif',
				},
			}),
		[prefersDarkMode]
	);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<User />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/usertable" element={<UserTable />} />
          <Route path="admin/qrreader" element={<QRReader />} />
          <Route path="admin/presentation" element={<Presentation />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
