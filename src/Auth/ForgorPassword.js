import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { app } from "./firebase";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth(app);
  const [errMessage, setErrMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      setSuccessMsg("Reset Email Sent");
      setErrMessage("");
    } catch (e) {
      setSuccessMsg("");
      setErrMessage(e.code.split("auth/")[1]);
    }
  };

  return (
    <div className="signInContainer">
      <div className="signInPage">
        <div className="authHeader">
          <div style={{ paddingBottom: "20px" }}>RESET PASSWORD</div>
          <TextField
            value={email}
            fullWidth
            required
            id="outlined-required"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px 0px" }}
          />
          {errMessage && (
            <Alert style={{ marginBottom: "10px" }} severity="error">
              {errMessage}
            </Alert>
          )}
          {successMsg && (
            <Alert style={{ marginBottom: "10px" }} severity="success">
              {successMsg}
            </Alert>
          )}
          <Button
            variant="contained"
            fullWidth
            style={{ margin: "10px 0px" }}
            onClick={handleForgotPassword}
          >
            RESET
          </Button>
          {successMsg && (
            <Button
              style={{ margin: "10px 0px" }}
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                navigate("../signin", { replace: true });
              }}
            >
              Goto to SIGN page
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
