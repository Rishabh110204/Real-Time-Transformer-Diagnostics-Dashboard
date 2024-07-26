import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "./global/Topbar";
import SideBar from "./global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RealtimeTemp from "./scenes/RealtimeTemp";
import All_Temp from "./scenes/All_Temp";
import LiveMap from "./scenes/LiveMap";
import Login from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box display="flex" height="100vh">
            {isAuthenticated && <SideBar onLogout={handleLogout} />}
            <Box flexGrow={1} display="flex" flexDirection="column">
              {isAuthenticated && <Topbar />}
              <Box flexGrow={1} p={2} overflow="auto">
                <Routes>
                  <Route 
                    path="/" 
                    element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={() => setIsAuthenticated(true)} />} 
                  />
                  <Route 
                    path="/home" 
                    element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/dashboard" 
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/RealtimeTemp" 
                    element={isAuthenticated ? <RealtimeTemp /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/All_Temp" 
                    element={isAuthenticated ? <All_Temp /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/LiveMap" 
                    element={isAuthenticated ? <LiveMap /> : <Navigate to="/" />} 
                  />
                </Routes>
              </Box>
            </Box>
          </Box>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
