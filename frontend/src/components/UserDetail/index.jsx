import React, { useState, useEffect } from "react";

import "./styles.css";

import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
/**
 * Show the details for one user and link to that user's photos.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => {
      setUser(data);
    });
  }, [userId]);

  if (!user) {
    return <p>User details could not be loaded.</p>;
  }

  return (
    <>
      <h2>
        {user.first_name} {user.last_name}
      </h2>

      <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "1.8em" }}>
        <li>
          <strong>Occupation:</strong> {user.occupation}
        </li>
        <li>
          <strong>Location:</strong> {user.location}
        </li>
        <li>
          <strong>Description:</strong> {user.description}
        </li>
      </ul>

      <Link to={`/photos/${user._id}`}>View photos</Link>
    </>
  );
}

export default UserDetail;
