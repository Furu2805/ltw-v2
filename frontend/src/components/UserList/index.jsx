import React, { useState, useEffect } from "react";

import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel("/user/list").then((data) => {
      setUsers(Array.isArray(data) ? data : []);
    });
  }, []);
  return (
    <div>
      <Typography variant="h6" component="h2" sx={{ px: 2, pt: 1 }}>
        Users
      </Typography>
      <List component="nav" aria-label="Users">
        {users.map((item) => (
          <li key={item._id}>
            <ListItemButton component={Link} to={`/users/${item._id}`}>
              <ListItemText
                primary={`${item.first_name} ${item.last_name}`}
              />
            </ListItemButton>
            <Divider />
          </li>
        ))}
      </List>
    </div>
  );
}

export default UserList;
