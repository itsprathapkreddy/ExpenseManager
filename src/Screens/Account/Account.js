import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../Auth/firebase";
import { AccountButtons } from "./AccountButtons";
import { AccountDetails } from "./AccountDetails";
import { AccountDetailsEdit } from "./AccountDetailsEdit";
import { LogoutButton } from "./LogoutButton";

const Account = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const userId = data.uid;
  const [edit, setEdit] = useState(false);
  const [newUname, setNewUname] = useState(data.uname);
  const [newCur, setNewCur] = useState(data.currency);

  const handleUpdate = async () => {
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

  const styles = {
    mainContainer: {
      width: "90%",
      margin: "5%",
      padding: "20px 10px",
      backgroundColor: "white",
      fontSize: "80%",
      borderRadius: "5px",
    },
    logoutContainer: {
      width: "90%",
      margin: "5%",
      padding: "20px 10px",
      backgroundColor: "white",
      fontSize: "80%",
      borderRadius: "5px",
    },
  };

  return (
    <div className="account">
      <div className="accountHeader">Account Details</div>

      <div style={styles.mainContainer}>
        {!edit ? (
          <AccountDetails
            newUname={newUname}
            newCur={newCur}
            email={data.email}
          ></AccountDetails>
        ) : (
          <AccountDetailsEdit
            newUname={newUname}
            newCur={newCur}
            email={data.email}
            setNewUname={setNewUname}
            setNewCur={setNewCur}
          ></AccountDetailsEdit>
        )}
        <AccountButtons
          edit={edit}
          data={data}
          handleUpdate={handleUpdate}
          setNewCur={setNewCur}
          setEdit={setEdit}
          setNewUname={setNewUname}
        ></AccountButtons>
      </div>

      <LogoutButton></LogoutButton>
    </div>
  );
};
export default Account;