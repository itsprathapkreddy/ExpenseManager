import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import MuiLoader from "../Screens/muiLoader";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  let navigate = useNavigate();
  const auth = getAuth(app);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    let user;
    try {
      user = toast.promise(
        signInWithEmailAndPassword(auth, signInEmail, signInPassword),
        {
          pending: "Promise is pending",
          success: "Promise resolved 👌",
          error: "Promise rejected 🤯",
        }
      );
    } catch (e) {
      setErrMessage(e.code.split("auth/")[1]);
      setLoading(false);
      return;
    }
    const docRef = doc(db, "users", user.user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      dispatch({
        type: "loggedTrue",
        payload: {
          transactions: data.transactions,
          uname: data.uname,
          email: data.email,
          currency: data.currency,
          categories: data.categories,
          uid: user.user.uid,
        },
      });
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <MuiLoader />}
      <div className="signInContainer">
        <div className="signInPage">
          <div className="authHeader">Expense Manager</div>
          <form onSubmit={handleSignIn} className="formSignIn">
            <TextField
              margin="normal"
              required
              autoFocus
              fullWidth
              label="Email Address"
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              onChange={(e) => setSignInPassword(e.target.value)}
            />

            {errMessage && <Alert severity="error">{errMessage}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ margin: "20px 0" }}
            >
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <p
                className="links"
                onClick={() => {
                  navigate("../forgotpassword", { replace: true });
                }}
              >
                {/* onClick={handleForgotPassword}> */}
                Forgot password?
              </p>
            </Grid>
            <Grid item>
              <p
                className="links"
                onClick={() => {
                  navigate("../signup", { replace: true });
                }}
              >
                {"Don't have an account? Sign Up"}
              </p>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
export default SignIn;
