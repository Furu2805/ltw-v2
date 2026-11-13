import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [context, setContext] = useState("Users");

  useEffect(() => {
    const match = location.pathname.match(/^\/(users|photos)\/([^/]+)$/);
    if (!match) {
      setContext("Users");
      return;
    }

    const [, view, userId] = match;
    setContext(view === "photos" ? "Photos" : "User details");
    fetchModel(`/user/${userId}`).then((user) => {
      if (user) {
        const name = `${user.first_name} ${user.last_name}`;
        setContext(view === "photos" ? `Photos of ${name}` : name);
      }
    });
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-title">
          Lương Minh Toàn - B23DCAT297
        </Typography>

        <Typography variant="subtitle1" className="topbar-context">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
