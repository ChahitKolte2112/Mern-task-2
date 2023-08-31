import React from "react";
import "./Header.css"; // Import the CSS file for styling
// import { logout } from "../redux/authSlice";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignOut } from "../api/auth";
const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signOutHandler = async () => {
        SignOut(dispatch, navigate);
    };
    return (
        <header className="header">
            <h1 className="logo">Across the world</h1>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",

                    boxSizing: "border-box",
                }}
            >
                <div>
                    <span style={{ marginRight: "10px" }}> {user?.name}</span>
                    <span>{user?.email}</span>
                </div>
                <button
                    style={{ marginTop: "5px" }}
                    className="logout-button"
                    onClick={signOutHandler}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
