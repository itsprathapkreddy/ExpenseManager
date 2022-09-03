import { signOut } from "firebase/auth";
import { loggedFalse } from "../constants/reduxConstants";

export const logoutHandler = async (dispatch, auth) => {
  await signOut(auth);
  dispatch({ type: loggedFalse });
};
