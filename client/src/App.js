import { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { MeRequest } from "./api/auth";
import { UserState } from "./slices/userSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(UserState);

  const callMeRoute = async () => {
    await MeRequest(dispatch, navigate);
  };
  useEffect(() => {
    callMeRoute();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={userState?.isLoggedIn ? <Home /> : <Signin />}
        />
        <Route
          path="/sign-in"
          element={userState?.isLoggedIn ? <Home /> : <Signin />}
        />
        <Route
          path="/sign-up"
          element={userState?.isLoggedIn ? <Home /> : <Signup />}
        />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
