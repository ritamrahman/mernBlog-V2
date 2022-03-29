import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/actions/authAction";
import { RESET_ERROR } from "../../Redux/constants/postConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOAD_CURRENT_USER_REQUEST } from "../../Redux/constants/auth";

const SingUp = ({ history }) => {
  toast.configure();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      isAuthenticated && toast.success("Registration successful");

      setTimeout(() => {
        history.push("/");
        window.location.reload(false);
      }, 2000);
    }

    if (error) {
      alert.error(error);
      history.push("/singup");
    }
  }, [dispatch, isAuthenticated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set(
      "avatar",
      avatar
        ? avatar
        : "https://res.cloudinary.com/dj2yaang5/image/upload/v1648561981/blogUsersAvatar/pq8wqw7z9etx6vs0w4lw.jpg"
    );

    dispatch(registerUser(formData));
  };

  // onChange function
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      console.log("reader", reader);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="row wrapper d-flex justify-content-center">
        <div className="col-10 col-lg-5 ">
          <form className="shadow-lg px-4" onSubmit={handleSubmit} encType="multipart/form-data">
            <h1 className="mb-3 text-center">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="avatar preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button id="register_button" type="submit" className="btn btn-block py-3">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingUp;
