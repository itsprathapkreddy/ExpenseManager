import { ModalUnstyled } from "@mui/base";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Auth/firebase";
import "../Components/dashboard.css";

import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";

const Transactions = () => {
  const [addTxn, setAddTxn] = useState(false);
  const [editTxn, setEditTnx] = useState(false);
  const categories = useSelector((state) => state.categories);
  const userId = useSelector((state) => state.uid);
  const ts = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  var [transData, setTransData] = useState(ts);
  const [curRow, setCurRow] = useState("");
  const [detailTrans, setDetailTrans] = useState(false);
  const [filter, setFilter] = useState({
    primary: "Select",
    secondary: "Select",
  });
  const [dateRange, setDateRange] = useState([]);

  const [txnForm, setTxnForm] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    txnName: "",
    category: "",
  });

  const Backdrop = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-tap-highlight-color: transparent;
  `;
  const style = {
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    p: 2,
    px: 4,
    pb: 3,
    m: 1,
  };

  const handleUpdateTxn = async (e) => {
    e.preventDefault();
    const timestamp = curRow;
    const newTransData = {
      transactions: {
        [timestamp]: {
          ...txnForm,
          time: timestamp,
        },
      },
    };
    await setDoc(doc(db, "users", userId), newTransData, { merge: true });
    let data = {
      ...transData,
      [timestamp]: {
        ...txnForm,
        time: timestamp,
      },
    };
    dispatch({
      type: "txnAddStore",
      payload: data,
    });

    setTransData(data);
    setEditTnx(false);
    setTxnForm({
      amount: "",
      date: new Date().toISOString().split("T")[0],
      txnName: "",
      category: "",
    });
  };

  const handleAddTxn = async (e) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();
    const newTransData = {
      transactions: {
        [timestamp]: {
          ...txnForm,
          time: timestamp,
        },
      },
    };
    await setDoc(doc(db, "users", userId), newTransData, { merge: true });
    let data = {
      ...transData,
      [timestamp]: {
        ...txnForm,
        time: timestamp,
      },
    };
    dispatch({
      type: "txnAddStore",
      payload: data,
    });

    setTransData(data);

    setAddTxn(false);
    setTxnForm({
      amount: "",
      date: new Date().toISOString().split("T")[0],
      txnName: "",
      category: "",
    });
  };

  const deleteTran = async () => {
    delete transData[curRow];
    delete ts[curRow];

    dispatch({
      type: "txnAddStore",
      payload: ts,
    });
    await updateDoc(doc(db, "users", userId), {
      transactions: deleteField(),
    });
    await setDoc(
      doc(db, "users", userId),
      {
        transactions: ts,
      },
      { merge: true }
    );
    setDetailTrans(false);
  };
  useEffect(() => {
    if (filter.primary !== "Select" && filter.secondary !== "Select") {
      const temp = ts;
      const tempObj = {};
      Object.keys(temp).filter((x) => {
        if (ts[x].category == filter.secondary) {
          tempObj[x] = ts[x];
        }
      });
      setTransData(tempObj);
    }
    if (filter.primary === "month") {
      const dates = Object.keys(ts)
        .map((x) => ts[x].date)
        .map((x) => new Date(x.replace(/-/g, "/")));

      const maxDate = new Date(Math.max(...dates));
      const minDate = new Date(Math.min(...dates));

      let tempArr = [];

      const maxMonth = maxDate.getMonth();
      const maxYear = maxDate.getFullYear();
      const minMonth = minDate.getMonth();
      const minYear = minDate.getFullYear();
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      for (let i = minYear; i <= maxYear; i++) {
        for (let j = 0; j <= 11; j++) {
          if (i === minYear && j >= minMonth) tempArr.push(months[j] + " " + i);
          else if (i === maxYear && j <= maxMonth)
            tempArr.push(months[j] + " " + i);
        }
      }
      setDateRange(tempArr);
    }
  }, [filter]);

  const handleFilter = (e) => {
    setFilter({ ...filter, secondary: e.target.value });
  };

  const handleMonthFilter = (e) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const cM = months.indexOf(e.target.value.split(" ")[0]);
    const cY = Number(e.target.value.split(" ")[1]);

    const temp = ts;
    const tempObj = {};
    Object.keys(temp).filter((x) => {
      if (
        new Date(ts[x].date.replace(/-/g, "/")).getMonth() === cM &&
        new Date(ts[x].date.replace(/-/g, "/")).getFullYear() == cY
      ) {
        tempObj[x] = ts[x];
      }
    });
    setTransData(tempObj);
  };

  return (
    <div className="transContainer">
      <div className="txnHeader">Transactions</div>
      <div className="txnButton" onClick={() => setAddTxn(true)}>
        Add An Expense
      </div>

      <ModalUnstyled
        className="modalStyle"
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={addTxn}
        onClose={() => {
          setAddTxn(false);
          setTxnForm({
            amount: "",
            date: new Date().toISOString().split("T")[0],
            txnName: "",
            category: "",
          });
        }}
        BackdropComponent={Backdrop}
      >
        <Box className="modalBoxStyle">
          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "600",
              margin: "5px 0px 10px 0px",
            }}
          >
            Add an Expense
          </div>
          <form onSubmit={handleAddTxn}>
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                autoFocus
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={txnForm.category}
                label="Category"
                margin="dense"
                size="small"
                onChange={(e) =>
                  setTxnForm((prev) => {
                    return {
                      ...prev,
                      category: e.target.value,
                    };
                  })
                }
              >
                {categories.map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              required
              value={txnForm.txnName}
              onChange={(e) =>
                setTxnForm((prev) => {
                  return {
                    ...prev,
                    txnName: e.target.value,
                  };
                })
              }
              label="Title"
              margin="dense"
              size="small"
            />

            <TextField
              fullWidth
              required
              value={txnForm.date}
              onChange={(e) =>
                setTxnForm((prev) => {
                  return {
                    ...prev,
                    date: e.target.value,
                  };
                })
              }
              margin="dense"
              type="date"
              label="Date"
              size="small"
            />

            <TextField
              type="number"
              required
              value={txnForm.amount}
              onChange={(e) =>
                setTxnForm((prev) => {
                  return {
                    ...prev,
                    amount: e.target.value,
                  };
                })
              }
              fullWidth
              label="Amount"
              margin="dense"
              size="small"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ width: "46%" }}
              >
                ADD
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAddTxn(false);
                  setTxnForm({
                    amount: "",
                    date: new Date().toISOString().split("T")[0],
                    txnName: "",
                    category: "",
                  });
                }}
                style={{ width: "46%" }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </ModalUnstyled>

      <ModalUnstyled
        className="modalStyle"
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={detailTrans}
        onClose={() => setDetailTrans(false)}
        BackdropComponent={Backdrop}
      >
        <Box className="modalBoxStyle">
          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "600",
              margin: "5px 0px 10px 0px",
            }}
          >
            Details of Transaction
          </div>
          <table className="detailsTxnTable">
            <tbody>
              <tr>
                <td>Date:</td>
                <td>{transData[curRow]?.date}</td>
              </tr>
              <tr>
                <td>Category:</td>
                <td>{transData[curRow]?.category}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{transData[curRow]?.txnName}</td>
              </tr>
              <tr>
                <td>Amount:</td>
                <td>$ {transData[curRow]?.amount}</td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ width: "49%" }}
              onClick={() => {
                setDetailTrans(false);
                setTxnForm({
                  amount: transData[curRow].amount,
                  date: transData[curRow].date,
                  txnName: transData[curRow].txnName,
                  category: transData[curRow].category,
                });
                setEditTnx(true);
              }}
            >
              EDIT
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="error"
              style={{ width: "49%" }}
              onClick={deleteTran}
            >
              DELETE
            </Button>
          </div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDetailTrans(false)}
            style={{ width: "100%", marginTop: "10px" }}
          >
            CANCEL
          </Button>
        </Box>
      </ModalUnstyled>

      <ModalUnstyled
        className="modalStyle"
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={editTxn}
        onClose={() => {
          setEditTnx(false);
          setTxnForm({
            amount: "",
            date: new Date().toISOString().split("T")[0],
            txnName: "",
            category: "",
          });
        }}
        BackdropComponent={Backdrop}
      >
        <Box className="modalBoxStyle">
          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "600",
              margin: "5px 0px 10px 0px",
            }}
          >
            Update an Expense
          </div>
          <form onSubmit={handleUpdateTxn}>
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                autoFocus
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={txnForm.category}
                label="Category"
                margin="dense"
                size="small"
                onChange={(e) =>
                  setTxnForm((prev) => {
                    return {
                      ...prev,
                      category: e.target.value,
                    };
                  })
                }
              >
                {categories.map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              required
              value={txnForm.txnName}
              defaultValue="fsfdw"
              onChange={(e) =>
                setTxnForm((prev) => {
                  return {
                    ...prev,
                    txnName: e.target.value,
                  };
                })
              }
              label="Title"
              margin="dense"
              size="small"
            />

            <TextField
              fullWidth
              required
              value={txnForm.date}
              onChange={(e) =>
                setTxnForm((prev) => {
                  return {
                    ...prev,
                    date: e.target.value,
                  };
                })
              }
              margin="dense"
              type="date"
              label="Date"
              size="small"
            />

            <TextField
              type="number"
              required
              value={txnForm.amount}
              onChange={(e) =>
                setTxnForm((prev) => {
                  return {
                    ...prev,
                    amount: e.target.value,
                  };
                })
              }
              fullWidth
              label="Amount"
              margin="dense"
              size="small"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ width: "46%" }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setEditTnx(false);
                  setTxnForm({
                    amount: "",
                    date: new Date().toISOString().split("T")[0],
                    txnName: "",
                    category: "",
                  });
                }}
                style={{ width: "46%" }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </ModalUnstyled>

      <div>
        <label htmlFor="filter">Filter By:</label>
        <select
          className="selectDrop"
          value={filter.primary}
          onChange={(e) => setFilter({ ...filter, primary: e.target.value })}
          name="filter"
        >
          <option value="Select">Select</option>
          <option value="category">Category</option>
          <option value="month">Month</option>
        </select>

        {filter.primary == "category" && (
          <select
            className="selectDrop"
            name="carsd"
            onChange={(e) => {
              handleFilter(e);
            }}
          >
            <option value="">Select</option>
            {categories.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </select>
        )}
        {filter.primary === "month" && (
          <select
            className="selectDrop"
            name="carsd"
            onChange={(e) => {
              handleMonthFilter(e);
            }}
          >
            <option value="">Select</option>
            {dateRange.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </select>
        )}
      </div>

      <TableContainer
        style={{
          backgroundColor: "white",
          marginBottom: "100px",
          cursor: "pointer",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell className="desCol">Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transData &&
              Object.keys(transData)?.map((key) => (
                <TableRow
                  onClick={() => {
                    setCurRow(key);
                    setDetailTrans(true);
                  }}
                  key={key}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {transData[key].date}
                    </span>
                  </TableCell>
                  <TableCell>{transData[key].category}</TableCell>
                  <TableCell className="desCol">
                    {transData[key].txnName}
                  </TableCell>
                  <TableCell>{Number(transData[key].amount)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Transactions;
