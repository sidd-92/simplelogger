import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Paper from "@material-ui/core/Paper";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  paperGrid: {
    width: "100%",
    padding: theme.spacing(2)
  },
  typo: {
    position: "relative",
    top: "10px"
  }
}));

export default function SimpleExpansionPanel({ info, date }) {
  const classes = useStyles();
  console.log("Values", info);
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{date}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Paper className={classes.paperGrid}>
            <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Food</Typography> <br />
                <Grid container>
                  <Grid item xs={4}>
                    R
                  </Grid>
                  <Grid item xs={4}>
                    G
                  </Grid>
                  <Grid item xs={4}>
                    HD
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Beverage</Typography> <br />
                <Grid container>
                  <Grid item xs={4}>
                    R
                  </Grid>
                  <Grid item xs={4}>
                    G
                  </Grid>
                  <Grid item xs={4}>
                    HD
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid direction="column" item xs={4}>
                <Grid>Breakfast</Grid>
                <Grid>Lunch</Grid>
                <Grid>Dinner</Grid>
              </Grid>
              <Grid direction="column" item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    1
                  </Grid>
                  <Grid item xs={4}>
                    0
                  </Grid>
                  <Grid item xs={4}>
                    2
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    1
                  </Grid>
                  <Grid item xs={4}>
                    0
                  </Grid>
                  <Grid item xs={4}>
                    2
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    1
                  </Grid>
                  <Grid item xs={4}>
                    0
                  </Grid>
                  <Grid item xs={4}>
                    2
                  </Grid>
                </Grid>
              </Grid>
              <Grid direction="column" item xs={4}>
                <Grid container>
                  <Grid item xs={4}>
                    1
                  </Grid>
                  <Grid item xs={4}>
                    0
                  </Grid>
                  <Grid item xs={4}>
                    2
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    1
                  </Grid>
                  <Grid item xs={4}>
                    0
                  </Grid>
                  <Grid item xs={4}>
                    2
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    1
                  </Grid>
                  <Grid item xs={4}>
                    0
                  </Grid>
                  <Grid item xs={4}>
                    2
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography className={classes.typo} variant="caption">
              R=Resident, G=Guest, HD=Home Delivery
            </Typography>
          </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
