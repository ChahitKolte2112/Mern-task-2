import { useState } from "react";
import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../api/auth";
import { UserState } from "../slices/userSlice";
import './Authpage.css' ;
const Signup = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    mobileNum: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector(UserState);

  const [formError, setFormError] = useState(false);
  const changeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formValue);
    if (
      formValue?.email &&
      formValue?.password &&
      formValue?.mobileNum &&
      formValue?.password
    ) {
      await SignUp(formValue, dispatch, navigate);
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
      <form className="authform" style={{ height: "700px" }} onSubmit={submitHandler}>
        <h3 className="auth-h3" style={{ marginTop: "0px" }}>Sign-Up Here</h3>
        <Input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          label="Name"
          value={formValue?.name}
          onChange={changeHandler}
          error={formError && formValue?.name === ""}
          errorMessage="Name is required."
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          label="Email"
          value={formValue?.email}
          onChange={changeHandler}
          error={formError && formValue?.email === ""}
          errorMessage="Email is required."
        />
        <Input
          type="text"
          name="mobileNum"
          placeholder="Enter Mobile Number"
          label="Mobile Number"
          value={formValue?.mobileNum}
          onChange={changeHandler}
          error={formError && formValue?.mobileNum === ""}
          errorMessage="Mobile number is requied."
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          label="password"
          value={formValue?.password}
          onChange={changeHandler}
          error={formError && formValue?.password === ""}
          errorMessage="Password is required"
        />
        <span
          className={`error ${formError && "show"}`}
          style={{ fontSize: "15px", marginTop: "20px" }}
        >
          * All Feilds Required
        </span>{" "}
        <span
          className={`error ${userState?.isErrors && "show"}`}
          style={{ fontSize: "15px", marginTop: "20px" }}
        >
          {userState?.errorMessage?.authForm}
        </span>
        <button className="authbutton" type="submit" disabled={userState?.isPending === true}>
          {" "}
          Sign-Up
        </button>
        <span style={{ marginTop: "20px", fontSize: "13px" }}>
          Already have an account ?{" "}
          <Link to="/sign-in" style={{ textDecoration: "none", color: "blue" }}>
            sign-in
          </Link>
        </span>
      </form>
    </>
  );
};

export default Signup;
