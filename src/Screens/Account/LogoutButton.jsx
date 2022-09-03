import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../utils/sharedFunctions/screenFunctions";

export const LogoutButton = () => {
  const dispatch = useDispatch();
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
        onClick={() => logoutHandler(dispatch)}
      >
        Logout
      </Button>
    </div>
  );
};
