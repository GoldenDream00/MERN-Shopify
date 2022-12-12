import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "../../assets/css/ProfilePage.css";
import Button from "../button";
import noavatar from "../../assets/images/Avatar profile photo.png";
const ProfilePage = ({ toggler, togglestate }) => {
  const { user, setUserData } = useContext(AuthContext);
  const [username, setUsername] = useState(user.user.username);
  const [photo, setPhoto] = useState("");
  const [displayphoto, setDisplayphoto] = useState("");
  const userId = user.user._id;
  const userPhoto = user.user.photo;
  const handlechange = (e) => {
    setPhoto(e.target.files[0]);
    setDisplayphoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const updated_data = new FormData();
    updated_data.append("username", username);
    if (photo !== "") {
      updated_data.append("photo", photo);
    }
    try {
      await axios.put(
        process.env.REACT_APP_API + "/api/users/" + userId,
        updated_data,
        config
      );
      const result = await axios.get(
        process.env.REACT_APP_API + "/api/users/" + userId
      );
      const token = localStorage.getItem("auth-token");
      setUserData({
        token,
        user: result.data,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <div className="profile">
      <div className={togglestate ? "profile-card-open" : "profile-card-close"}>
        <div className="close-div">
          <span onClick={toggler}>
            <p className="close-symbol">x</p>
          </span>
        </div>
        <img
          className="profile-image"
          src={displayphoto ? displayphoto : userPhoto ? userPhoto : noavatar}
          alt=""
        />
        <form>
          <label htmlFor="username">Please Change Your Username</label>
          <input
            type="text"
            className="username-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          ></input>
          <input
            className="update-profilepic"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            name="photo"
            onChange={handlechange}
          />
          <Button onClick={handleSubmit} text="UPDATE" />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
