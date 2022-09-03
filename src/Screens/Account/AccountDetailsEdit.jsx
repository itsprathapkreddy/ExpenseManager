import {
  Select,
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
} from "@mui/material";
import { curData } from "../../utils/constants/constants";

export const AccountDetailsEdit = (props) => {
  const { newUname, newCur, email, setNewUname, setNewCur } = props;
  return (
    <>
      <TextField
        label="User Name"
        value={newUname}
        style={{ margin: "10px 0px", width: "100%" }}
        onChange={(e) => setNewUname(e.target.value)}
        variant="filled"
      />
      <FormControl variant="filled" fullWidth style={{ margin: "10px 0px" }}>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newCur}
          label="Currency"
          onChange={(e) => setNewCur(e.target.value)}
        >
          {curData.map((x, i) => (
            <MenuItem
              key={i}
              value={String.fromCharCode(x.htmlCode) + " " + x.name}
            >
              {String.fromCharCode(x.htmlCode) + " " + x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Email"
        disabled
        value={email}
        style={{ margin: "10px 0px", width: "100%" }}
        variant="filled"
      />
    </>
  );
};
