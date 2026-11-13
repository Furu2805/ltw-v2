import React, { useState, useEffect } from "react";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((data) => {
      setPhotos(Array.isArray(data) ? data : []);
    });
  }, [userId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime())
      ? "Unknown date"
      : date.toLocaleString();
  };

  return (
    <>
      <h2>Photos</h2>

      {photos.length === 0 && <p>No photos found for this user.</p>}

      {photos.map((photo) => (
        <div key={photo._id}>
          <img
            src={require(`../../images/${photo.file_name}`)}
            alt={photo.file_name}
          />
          <p>Created: {formatDate(photo.date_time)}</p>

          {photo.comments && photo.comments.length > 0 ? (
            <div>
              <h4>Comments({photo.comments.length}):</h4>
              <ul>
                {photo.comments.map((comment) => (
                  <li key={comment._id}>
                    <p>{formatDate(comment.date_time)}</p>
                    {comment.user ? (
                      <Link to={`/users/${comment.user._id}`}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                    ) : (
                      <span>Unknown user</span>
                    )}
                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
}

export default UserPhotos;
