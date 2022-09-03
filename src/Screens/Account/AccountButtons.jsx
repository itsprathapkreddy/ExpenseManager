import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleAccountUpdate } from "../../utils/sharedFunctions/screenFunctions";

export const AccountButtons = (props) => {
  const {
    edit,
    setEdit,
    setNewUname,
    setNewCur,
    data,
    newUname,
    newCur,
    userId,
  } = props;
  const dispatch = useDispatch();
  return (
    <div style={{ margin: "10px" }}>
      {!edit && (
        <Button variant="contained" onClick={() => setEdit(true)}>
          Edit
        </Button>
      )}
      {edit && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handleAccountUpdate(dispatch, setEdit, newUname, newCur, userId)
            }
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setNewCur(data.currency);
              setNewUname(data.uname);
              setEdit(false);
            }}
            style={{ margin: "0px 10px" }}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};
