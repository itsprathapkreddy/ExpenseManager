import { Button } from "@mui/material";

export const AccountButtons = (props) => {
  const { edit, setEdit, setNewUname, setNewCur, handleUpdate, data } = props;
  return (
    <div style={{ margin: "10px" }}>
      {!edit && (
        <Button variant="contained" onClick={() => setEdit(true)}>
          Edit
        </Button>
      )}
      {edit && (
        <>
          <Button variant="contained" color="success" onClick={handleUpdate}>
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
