import { getAuth, signOut } from "firebase/auth";
import { loggedFalse } from "../constants/reduxConstants";
import { app, db } from "../../Auth/firebase";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

export const logoutHandler = async (dispatch) => {
  await signOut(auth);
  dispatch({ type: loggedFalse });
};

export const handleAccountUpdate = async (
  dispatch,
  setEdit,
  newUname,
  newCur,
  userId
) => {
  setEdit(false);
  await setDoc(
    doc(db, "users", userId),
    {
      uname: newUname,
      currency: newCur,
    },
    { merge: true }
  );
  dispatch({
    type: "accountData",
    payload: {
      uname: newUname,
      currency: newCur,
    },
  });
};
