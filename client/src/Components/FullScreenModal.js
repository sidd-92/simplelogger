import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
//import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ViewListIcon from "@material-ui/icons/ViewList";
import Slide from "@material-ui/core/Slide";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    props.filterByDate();
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Typography variant="caption" style={{ color: "white" }}>
          Filters
        </Typography>
        <ViewListIcon style={{ color: "white" }} />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Filter By Date
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Apply
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                id="mui-pickers-date"
                label="Start Date"
                value={startDate}
                onChange={date => setStartDate(date)}
                onAccept={date => props.handleStartDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </ListItem>
          <Divider />
          <ListItem>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                id="mui-pickers-date"
                label="End Date"
                value={endDate}
                onChange={date => setEndDate(date)}
                onAccept={date => props.handleEndDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
