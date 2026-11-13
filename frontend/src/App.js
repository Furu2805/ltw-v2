import "./App.css";

import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

function PhotoAppLayout() {
  const location = useLocation();
  const isUsersView = location.pathname === "/users";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <div className="main-topbar-buffer" />

      {!isUsersView && (
        <Grid item xs={12} sm={3}>
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
      )}

      <Grid item xs={12} sm={isUsersView ? 12 : 9}>
        <Paper className="main-grid-item">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserDetail />} />
            <Route path="/photos/:userId" element={<UserPhotos />} />
            <Route path="*" element={<Typography>Page not found.</Typography>} />
          </Routes>
        </Paper>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <Router>
      <PhotoAppLayout />
    </Router>
  );
}

export default App;
