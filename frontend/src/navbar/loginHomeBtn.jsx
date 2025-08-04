import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AxiosExclusive from "../components/axiosConfig";
import AuthContext from "../context/AuthContext";

export default function LoginHomeBtn({
  targetPath,
  title,
  showUserNameIfLoggedIn,
  onClick,
}) {
    const {logOut}=useContext(AuthContext)
  const tokenUserLogin = localStorage.getItem("tokenUserLogin");

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.firstName;

  const showName = tokenUserLogin && showUserNameIfLoggedIn && firstName;
  const label = showName ? firstName : title;
  const text = showName ? "  عزیز" : "";

  //for log out
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (onClick) onClick();
    if (targetPath) navigate(targetPath);
  };
  if (showName) {
    return (
      <div className="nav-item dropdown mx-2 userBtn">
        <a
          className="nav-link dropdown-toggle "
          href="#"
          id="userDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {label}
          {text}
          <img src="/auth/images/user.png" className="userPic ms-2" />
        </a>
        <ul className="dropdown-menu" aria-labelledby="userDropdown">
          <li>
            <button className="dropdown-item text-danger" onClick={logOut}>
              خروج
            </button>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <button className="btn btn-outline-primary mx-2" onClick={handleClick}>
      {label}
    </button>
  );
}
