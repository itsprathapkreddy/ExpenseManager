import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import { Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import logo from "../assets/logo.svg";
import Account from "../Screens/Account/Account";
import Categories from "../Screens/Categories";
import Overview from "../Screens/Overview";
import Transactions from "../Screens/Transactions";
import "./dashboard.css";

const DashBoard = () => {
  const [page, setPage] = useState("overview");
  const [value, setValue] = useState(0);
  const styles = {
    headerContainer: {
      backgroundColor: "#403E3D",
      color: "white",
      fontSize: "30px",
      borderBottom: "2px solid black",
      height: "60px",
      position: "sticky",
      top: "0",
      padding: "15px",
      fontFamily: "Nunito!important",
    },
    buttonContainer: {
      backgroundColor: "#36454F",
      color: "#fff",
      height: "calc(100vh - 60px)",
      position: "sticky",
      top: "60px",
    },
  };

  return (
    <Grid container spacing={0}>
      <Grid container spacing={0} style={styles.headerContainer}>
        <img src={logo} alt="logo" width="30px" height="30px" />
        <span style={{ paddingLeft: "20px" }}>Expense Manager</span>
      </Grid>

      <Grid item md={2} xs={0}>
        <div className="buttonContainer" style={styles.buttonContainer}>
          <div style={{ padding: "10px 0px" }}></div>

          <div
            className={
              page === "overview" ? "buttons addBorder" : "buttons noBorder"
            }
            onClick={() => setPage("overview")}
          >
            <span></span>
            <DashboardCustomizeRoundedIcon sx={{ fontSize: 24 }} />
            <span style={{ verticalAlign: "top", paddingLeft: "15px" }}>
              Overview
            </span>
          </div>

          <div
            className={
              page === "transactions" ? "buttons addBorder" : "buttons noBorder"
            }
            onClick={() => setPage("transactions")}
          >
            <CompareArrowsRoundedIcon sx={{ fontSize: 24 }} />
            <span style={{ verticalAlign: "top", paddingLeft: "15px" }}>
              Transactions
            </span>
          </div>

          <div
            className={
              page === "categories" ? "buttons addBorder" : "buttons noBorder"
            }
            onClick={() => setPage("categories")}
          >
            <CategoryRoundedIcon sx={{ fontSize: 24 }} />
            <span style={{ verticalAlign: "top", paddingLeft: "15px" }}>
              Categories
            </span>
          </div>

          <div
            className={
              page === "account" ? "buttons addBorder" : "buttons noBorder"
            }
            onClick={() => setPage("account")}
          >
            <AccountCircleRoundedIcon sx={{ fontSize: 24 }} />
            <span style={{ verticalAlign: "top", paddingLeft: "15px" }}>
              Account
            </span>
          </div>
        </div>
      </Grid>

      <Grid item md={10} xs={12}>
        <div className="screenContainer" style={styles.buttonContainer}>
          {page == "overview" && <Overview />}
          {page == "transactions" && <Transactions />}
          {page == "categories" && <Categories />}
          {page == "account" && <Account />}
        </div>
      </Grid>
      <div className="bottomNav">
        <BottomNavigation
          style={{ backgroundColor: "#F5F5F5" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            switch (newValue) {
              case 1:
                setPage("transactions");
                break;
              case 2:
                setPage("categories");
                break;
              case 3:
                setPage("account");
                break;
              default:
                setPage("overview");
            }
          }}
        >
          <BottomNavigationAction
            label="overview"
            icon={<DashboardCustomizeRoundedIcon />}
          />
          <BottomNavigationAction
            label="transactions"
            icon={<CompareArrowsRoundedIcon />}
          />
          <BottomNavigationAction
            label="categories"
            icon={<CategoryRoundedIcon />}
          />
          <BottomNavigationAction
            label="account"
            icon={<AccountCircleRoundedIcon />}
          />
        </BottomNavigation>
      </div>
    </Grid>
  );
};
export default DashBoard;
