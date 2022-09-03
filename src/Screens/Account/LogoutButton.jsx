import { Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { app } from "../../Auth/firebase";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../utils/shared functions/screenFunctions";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  console.log({ auth });
  const logoutContainer = {
    width: "90%",
    margin: "5%",
    padding: "20px 10px",
    backgroundColor: "white",
    fontSize: "80%",
    borderRadius: "5px",
  };
  return (
    <div style={logoutContainer}>
      <Button
        variant="contained"
        style={{ backgroundColor: "#f44336" }}
        fullWidth
        onClick={() => logoutHandler(dispatch, auth)}
      >
        Logout
      </Button>
    </div>
  );
};
