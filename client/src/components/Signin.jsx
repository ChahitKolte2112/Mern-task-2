import { useState } from "react";
import { SignIn } from "../api/auth";
import { Input } from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserState } from "../slices/userSlice";
import "./Authpage.css";
const Signin = () => {
    const [formValue, setFormValue] = useState({
        credential: "",
        password: "",
    });
    const [formError, setFormError] = useState(false);

    const userState = useSelector(UserState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formValue);
        if (formValue?.credential && formValue?.password) {
            await SignIn(formValue, dispatch, navigate);
        } else {
            setFormError(true);
        }
    };

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="authform"onSubmit={submitHandler}>
                <h3 className="authform-h3">Sign-In Here</h3>
                <Input
                    type="text"
                    name="credential"
                    placeholder="Enter Email /Phone Number"
                    label="Email/Phone"
                    value={formValue?.credential}
                    onChange={changeHandler}
                    error={formError && formValue?.credential === ""}
                    errorMessage="This Field is required"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    label="password"
                    value={formValue?.password}
                    error={formError && formValue?.password === ""}
                    onChange={changeHandler}
                    errorMessage="Password is Required"
                />
                <span
                    className={`error ${formError && "show"}`}
                    style={{ fontSize: "15px", marginTop: "20px" }}
                >
                    * All Feilds Required
                </span>

                <span
                    className={`error ${userState?.isErrors && "show"}`}
                    style={{ fontSize: "15px", marginTop: "20px" }}
                >
                    {userState?.errorMessage?.authForm}
                </span>

                <button  className="authbutton" type="submit" disabled={userState?.isPending}>
                    {" "}
                    Sign-In
                </button>

                <span style={{ marginTop: "20px", fontSize: "13px" }}>
                    Don't have an account ?{" "}
                    <Link
                        to="/sign-up"
                        style={{ textDecoration: "none", color: "blue" }}
                    >
                        sign-up
                    </Link>
                </span>
            </form>
        </>
    );
};

export default Signin;
