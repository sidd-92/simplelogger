import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import TabPanel from "./Components/TabPanel";
import SimpleMenu from "./Components/SimpleMenu";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import ComplexGrid from "./Components/ComplexCard";
import ExpansionPanels from "./Components/ExpansionPanels";
import Moment from "moment";
import MomentUtils from "@date-io/moment";
import axios from "axios";
import min from "lodash/min";
import FullScreenDialog from "./Components/FullScreenModal";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      selectedDate: new Date(),
      selectValue: { mealType: "None" },
      mealOption: "Beverage",
      totalResident: "",
      totalGuest: "",
      totalHomeDelivery: "",
      foodMealObj: {},
      openSnackBar: false,
      addedLogs: [],
      errorMessage: "",
      isFilterOn: false,
      endDate: Moment(new Date()).format("YYYY-MM-DD"),
      startDate: Moment(new Date()).format("YYYY-MM-DD"),
      deleteMode: false,
      logFilteredDate: {},
      totalResidentsTillDate: 0,
      totalGuestsTillDate: 0,
      totalHomeDeliveryTillDate: 0,
      totalResidentsTillDate_Beverage: 0,
      totalGuestsTillDate_Beverage: 0,
      totalHomeDeliveryTillDate_Beverage: 0,
      max_date: "",
      min_date: "",
      totalSum: 0,
      comment: ""
    };
  }
  componentDidMount() {
    this.getAllLogs();
  }

  getAllLogs = () => {
    axios.get(`/api/logs`).then(res => {
      const { count, logs } = res.data;
      //console.log("Logs", ...logs);
      //console.log("Count", count);
      let newLogArray = [];
      logs.map(log => {
        let newLog = {
          date: Moment(log.dateLogged).format("Do MMM YY"),
          mealType: log.mealType,
          comment: log.comment,
          mealOption: log.isBeverage ? "Beverage" : "Food",
          category: {
            r: log.totalResident,
            g: log.totalGuest,
            hd: log.totalHD
          },
          _id: log._id
        };
        newLogArray.push(newLog);
        return newLogArray;
      });
      this.setState(
        {
          addedLogs: newLogArray,
          isFilterOn: false
        },
        () => {
          this.filterOutLogsByDate();
          this.computeTotalCategory();
        }
      );
    });
  };
  filterOutLogsByDate = () => {
    let logs = this.state.addedLogs;
    let logsByDate = {};
    let logFilteredDate = this.state.logFilteredDate;
    logs.map(log => {
      //console.log(log.date);
      if (log.date in logsByDate === false) {
        logsByDate[log.date] = true;
      }
      return logsByDate;
    });
    let dates = Object.keys(logsByDate);
    dates.map(date => {
      let res = this.givenDateReturnLog(date);
      logFilteredDate[date] = res;
    });
    this.giveMealTypeBasedOnDate(this.state.addedLogs);
    let len = Object.keys(logFilteredDate).length;
    //console.log("MIn Date", min(Object.keys(logFilteredDate)));
    let max_date = Object.keys(logFilteredDate).sort((d1, d2) => {
      return d2 - d1;
    })[0];
    let min_date = Object.keys(logFilteredDate).sort((d1, d2) => {
      return d1 - d2;
    })[len - 1];
    this.setState({ logFilteredDate, min_date, max_date });
  };

  givenDateReturnLog = date => {
    let logs = this.state.addedLogs;
    let res = logs.filter(log => log.date === date);
    return res;
    //console.log("result", dateObj);
  };
  giveMealTypeBasedOnDate = dateArray => {
    let mealTypeObj = {};
    dateArray.map(item => {
      if (item.mealType === "Breakfast" && item.mealOption === "Food") {
        mealTypeObj[`${item.date} Breakfast`] = {
          category: item.category,
          option: "Food",
          type: "Breakfast"
        };
      }
      if (item.mealType === "Lunch" && item.mealOption === "Food") {
        mealTypeObj[`${item.date} Lunch`] = {
          category: item.category,
          option: "Food",
          type: "Lunch"
        };
      }
      if (item.mealType === "Dinner" && item.mealOption === "Food") {
        mealTypeObj[`${item.date} Dinner`] = {
          category: item.category,
          option: "Food",
          type: "Dinner"
        };
      }
      if (item.mealType === "Snack" && item.mealOption === "Food") {
        mealTypeObj[`${item.date} Snack`] = {
          category: item.category,
          option: "Food",
          type: "Snack"
        };
      }
      if (
        item.mealType === "None" ||
        (item.mealType === "Dinner" && item.mealOption === "Beverage")
      ) {
        mealTypeObj[`${item.date} Beverage`] = {
          category: item.category
        };
      }
    });
    this.setState({ foodMealObj: mealTypeObj });
    //console.log(mealTypeObj);
  };
  computeTotalCategory = () => {
    let allLogs = this.state.addedLogs;
    let initR = 0;
    let initG = 0;
    let initHD = 0;
    let initR_B = 0;
    let initG_B = 0;
    let initHD_B = 0;
    allLogs.map(log => {
      if (log.mealOption === "Food") {
        if (
          log.mealType === "Breakfast" ||
          log.mealType === "Lunch" ||
          log.mealType === "Dinner"
        ) {
          initR = parseInt(log.category.r) + initR;
          initG = log.category.g + initG;
          initHD = log.category.hd + initHD;
        }
      }
      if (log.mealOption === "Beverage") {
        initR_B = log.category.r + initR_B;
        initG_B = log.category.g + initG_B;
        initHD_B = log.category.hd + initHD_B;
      }
    });
    //console.log("totalHomeDeliveryTillDate = ", initHD);
    this.setState(
      {
        totalResidentsTillDate: initR,
        totalGuestsTillDate: initG,
        totalHomeDeliveryTillDate: initHD,
        totalResidentsTillDate_Beverage: initR_B,
        totalGuestsTillDate_Beverage: initG_B,
        totalHomeDeliveryTillDate_Beverage: initHD_B
      },
      () => this.calculateTotalCost()
    );
    //console.log("computeTotalNumberOfResidents", initR);
  };
  calculateTotalCost = () => {
    //Home Delivery Total Beverages
    let totalBevHD = this.state.totalHomeDeliveryTillDate_Beverage * 16.25;
    //Food Home Delivery
    let totalResHD = this.state.totalHomeDeliveryTillDate * 70;
    //Bev Dining
    let totalBevRes = this.state.totalResidentsTillDate_Beverage * 14.25;
    //Food Dining
    let totalFoodRes = this.state.totalResidentsTillDate * 14.25;

    let totalSum = totalBevHD + totalResHD + totalBevRes + totalFoodRes;
    this.setState({ totalSum });
  };
  handleTabChange = (e, v) => {
    this.setState({ tabValue: v });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleSelectChange = (e, values) => {
    this.setState({ selectValue: { mealType: e.target.value } });
  };
  handleMealOptionChange = (e, values) => {
    this.setState({ mealOption: values });
  };
  handleChangeResident = e => {
    e.preventDefault();
    this.setState({ totalResident: e.target.value });
  };
  handleChangeGuest = e => {
    e.preventDefault();
    this.setState({ totalGuest: e.target.value });
  };
  handleChangeHomeDelivery = e => {
    e.preventDefault();
    this.setState({ totalHomeDelivery: e.target.value });
  };
  handleComment = e => {
    e.preventDefault();
    this.setState({ comment: e.target.value });
  };
  addLog = e => {
    if (
      this.state.totalResident === "" &&
      this.state.totalGuest === "" &&
      this.state.totalHomeDelivery === ""
    ) {
      this.setState({
        errorMessage: "Please Enter a Value"
      });
      return;
    }
    if (
      this.state.totalResident >= 0 ||
      this.state.totalGuest >= 0 ||
      this.state.totalHomeDelivery >= 0
    ) {
      let log = {
        date: Moment(this.state.selectedDate).format("Do MMM YY"),
        mealType: this.state.selectValue.mealType,
        mealOption: this.state.mealOption,
        comment: this.state.comment,
        category: {
          r: this.state.totalResident >= 0 ? this.state.totalResident : 0,
          g: this.state.totalGuest >= 0 ? this.state.totalGuest : 0,
          hd:
            this.state.totalHomeDelivery >= 0 ? this.state.totalHomeDelivery : 0
        }
      };
      let dbData = {
        isBeverage: this.state.mealOption === "Beverage",
        totalResident: log.category.r,
        totalGuest: log.category.g,
        totalHD: log.category.hd,
        mealType: log.mealType,
        comment: log.comment,
        date: this.state.selectedDate
      };
      axios.post(`/api/logs`, dbData).then(res => {
        //console.log(res);
        //console.log(res.data);
      });
      let newLogs = [];
      newLogs.push(log);
      this.setState(
        {
          addedLogs: [...this.state.addedLogs, log],
          openSnackBar: true,
          tabValue: 1
        },
        () => {
          this.getAllLogs();
          this.resetFields();
          this.computeTotalCategory();
        }
      );
    } else {
      this.setState({
        errorMessage: "Please Add Number of Res/Guest/Home Delivery"
      });
    }
  };
  resetFields = () => {
    this.setState({
      selectedDate: new Date(),
      selectValue: { mealType: "None" },
      mealOption: "Food",
      totalResident: "",
      totalGuest: "",
      totalHomeDelivery: "",
      errorMessage: "",
      comment: ""
    });
  };

  filterByDate = () => {
    let dateObj = {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    axios.post(`/api/logs/filterbydate`, dateObj).then(res => {
      let count = res.data.count;
      if (count > 0) {
        let logs = res.data.logs;
        let tempArray = [];
        logs.map(log => {
          let obj = {
            date: Moment(log.dateLogged).format("Do MMM YY"),
            mealType: log.mealType,
            comment: log.comment,
            mealOption: log.isBeverage ? "Beverage" : "Food",
            category: {
              r: log.totalResident,
              g: log.totalGuest,
              hd: log.totalHD
            },
            _id: log._id
          };
          tempArray.push(obj);
        });
        this.setState({ addedLogs: tempArray, isFilterOn: true });
      }
      //console.log(res.data);
    });
  };
  clearFilter = () => {
    this.getAllLogs();
  };
  getEndDate = endDate => {
    // console.log("END DATE", Moment(endDate).format("DD-MM-YYYY"));
    this.setState({ endDate: Moment(endDate).format("YYYY-MM-DD") });
  };
  getStartDate = startDate => {
    // console.log("START DATE", Moment(startDate).format("DD-MM-YYYY"));
    this.setState({ startDate: Moment(startDate).format("YYYY-MM-DD") });
  };
  deleteMode = value => {
    this.setState({ deleteMode: value });
    //console.log("Delete Mode", value);
  };
  deleteLog = value => {
    axios.delete(`/api/logs/${value._id}`).then(res => {
      // console.log(res);
      // console.log(res.data);
      alert("Log Was Deleted");
      this.getAllLogs();
      this.computeTotalCategory();
    });
  };
  render() {
    const {
      tabValue,
      selectedDate,
      mealOption,
      selectValue,
      openSnackBar,
      isFilterOn
    } = this.state;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Food Logger
            </Typography>
            <FullScreenDialog
              handleEndDateChange={this.getEndDate}
              handleStartDateChange={this.getStartDate}
              filterByDate={this.filterByDate}
            />
            <SimpleMenu deleteMode={this.deleteMode} />
            {isFilterOn && (
              <Button color="inherit" onClick={this.clearFilter}>
                Clear
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={() => this.setState({ openSnackBar: false })}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Log Added</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({ openSnackBar: false })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Paper square>
          <Tabs
            variant="fullWidth"
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, v) => this.handleTabChange(e, v)}
            aria-label="disabled tabs example"
          >
            <Tab label="Add New Log" />
            <Tab
              label={
                <Badge
                  className="badgeCount"
                  color="secondary"
                  badgeContent={this.state.addedLogs.length}
                >
                  View Logs
                </Badge>
              }
            />
            {this.state.addedLogs.length > 0 ? (
              <Tab label="Summary" />
            ) : (
              <Tab disabled label="Summary" />
            )}
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="subtitle1"
            component="p"
            align="center"
            className="detailsHeader"
          >
            Enter The Details Below
          </Typography>
          <Paper elevation={2} className="addPaper">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableFuture={true}
                margin="normal"
                fullWidth
                id="mui-pickers-date"
                label="Select a Date"
                value={selectedDate}
                onChange={date => this.handleDateChange(date)}
                onAccept={date => this.handleDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Paper>
          <Paper elevation={2} className="selectPaper">
            <FormControl fullWidth>
              <InputLabel htmlFor="mealType-simple">Meal Type</InputLabel>
              <Select
                value={selectValue.mealType}
                onChange={(e, values) => this.handleSelectChange(e, values)}
                inputProps={{
                  name: "mealType",
                  id: "mealType-simple"
                }}
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Snack"}>Snack</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <Paper elevation={2} className="selectPaper">
            <FormControl component="fieldset">
              <FormLabel component="legend">Beverage / Food</FormLabel>
              <RadioGroup
                row
                aria-label="Beverage / Food"
                name="mealOption"
                value={mealOption}
                onChange={(e, values) => this.handleMealOptionChange(e, values)}
              >
                {selectValue.mealType !== "None" && (
                  <FormControlLabel
                    value="Food"
                    control={<Radio />}
                    label="Food"
                  />
                )}

                <FormControlLabel
                  value="Beverage"
                  control={<Radio />}
                  label="Beverage"
                />
              </RadioGroup>
              <FormHelperText>Did You Have a Beverege ?</FormHelperText>
            </FormControl>
          </Paper>
          <Paper elevation={2} className="gridPaper">
            <Typography variant="caption" gutterBottom>
              Enter The Total Number Of Each Category
            </Typography>
            <Grid container spacing={3} className="gridText">
              <Grid item xs={4}>
                <TextField
                  required
                  value={this.state.totalResident}
                  error={this.state.errorMessage !== ""}
                  type="number"
                  onChange={e => this.handleChangeResident(e)}
                  className="textField"
                  id="outlined-dense"
                  label="1"
                  margin="dense"
                  helperText="Resident"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  error={this.state.errorMessage !== ""}
                  value={this.state.totalGuest}
                  onChange={e => this.handleChangeGuest(e)}
                  type="number"
                  className="textField"
                  id="outlined-dense"
                  label="1"
                  margin="dense"
                  helperText="Guest"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  error={this.state.errorMessage !== ""}
                  value={this.state.totalHomeDelivery}
                  onChange={e => this.handleChangeHomeDelivery(e)}
                  helperText="Home Delivery"
                  type="number"
                  className="textField"
                  id="outlined-dense"
                  label="1"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              required
              value={this.state.comment}
              onChange={e => this.handleComment(e)}
              type="text"
              className="comment"
              id="outlined-dense"
              label="Enter Comment"
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Paper>
          <Button
            variant="contained"
            onClick={e => this.addLog(e)}
            color="primary"
            className="addButton"
          >
            Log Details
          </Button>
          {this.state.errorMessage !== "" && (
            <Typography color="error" align="center">
              Please Enter a Value
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {this.state.addedLogs.length > 0 &&
            this.state.addedLogs.map((log, i) => (
              <ComplexGrid
                deleteMode={this.state.deleteMode}
                key={i}
                log={log}
                deleteLog={this.deleteLog}
              />
            ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Paper className="paperPadding">
            <div className="typoBg">
              <Typography variant="subtitle2">
                {this.state.min_date} - {this.state.max_date}
              </Typography>
              <Typography variant="subtitle2">
                Total Cost = &#8377; {this.state.totalSum}
              </Typography>
            </div>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <div className="centerDiv">
                  <Typography className="typoGridClass" variant="body2">
                    Resident
                  </Typography>
                  <div className="gridSummary">
                    <div>
                      <Typography variant="caption">Food</Typography>
                      <p>{this.state.totalResidentsTillDate}</p>
                    </div>
                    <div>
                      <Typography variant="caption">Beverage</Typography>
                      <p>{this.state.totalResidentsTillDate_Beverage}</p>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="centerDiv">
                  <Typography className="typoGridClass" variant="body2">
                    Guest
                  </Typography>
                  <div className="gridSummary">
                    <div>
                      <Typography variant="caption">Food</Typography>
                      <p>{this.state.totalGuestsTillDate}</p>
                    </div>
                    <div>
                      <Typography variant="caption">Beverage</Typography>
                      <p>{this.state.totalGuestsTillDate_Beverage}</p>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="centerDiv">
                  <Typography className="typoGridClass" variant="body2">
                    Home Delivery
                  </Typography>
                  <div className="gridSummary">
                    <div>
                      <Typography variant="caption">Food</Typography>
                      <p>{this.state.totalHomeDeliveryTillDate}</p>
                    </div>
                    <div>
                      <Typography variant="caption">Beverage</Typography>
                      <p>{this.state.totalHomeDeliveryTillDate_Beverage}</p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Typography variant="caption">
              Here You Can See Sum Of Each Category
            </Typography>
          </Paper>
          {Object.keys(this.state.logFilteredDate).length > 0 &&
            Object.keys(this.state.logFilteredDate).map((filtered, index) => (
              <ExpansionPanels
                key={index}
                date={filtered}
                info={this.state.foodMealObj}
              />
            ))}
        </TabPanel>
      </React.Fragment>
    );
  }
}
export default App;
