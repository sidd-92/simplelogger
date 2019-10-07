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
  //console.log("SimpleExpansionPanel", date, info[`${date} Dinner`]);
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
            <Grid container spacing={4}>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
                <Typography variant="subtitle2">None</Typography> <br />
                <Grid container alignItems="center" justify="center">
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
              <Grid container direction="column" item xs={3}>
                <Grid>Break/F</Grid>
                <Grid>Lunch</Grid>
                <Grid>Dinner</Grid>
              </Grid>
              <Grid container direction="column" item xs={3}>
                <Grid container>
                  <Grid item xs={4}>
                    {info[`${date} Breakfast`]["category"].r}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Breakfast`]["category"].g}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Breakfast`]["category"].hd}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    {info[`${date} Lunch`]["category"].r}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Lunch`]["category"].g}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Lunch`]["category"].hd}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    {info[`${date} Dinner`]["category"].r}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Dinner`]["category"].g}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Dinner`]["category"].hd}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="column" item xs={3}>
                <Grid container>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Breakfast`] &&
                      info[`${date} Beverage Breakfast`]["category"].r) ||
                      "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Breakfast`] &&
                      info[`${date} Beverage Breakfast`]["category"].g) ||
                      "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Breakfast`] &&
                      info[`${date} Beverage Breakfast`]["category"].hd) ||
                      "-"}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Lunch`] &&
                      info[`${date} Beverage Lunch`]["category"].r) ||
                      "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Lunch`] &&
                      info[`${date} Beverage Lunch`]["category"].g) ||
                      "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Lunch`] &&
                      info[`${date} Beverage Lunch`]["category"].hd) ||
                      "-"}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Dinner`] &&
                      info[`${date} Beverage Dinner`]["category"].r) ||
                      "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Dinner`] &&
                      info[`${date} Beverage Dinner`]["category"].g) ||
                      "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {(info[`${date} Beverage Dinner`] &&
                      info[`${date} Beverage Dinner`]["category"].hd) ||
                      "-"}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                item
                xs={3}
              >
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={4}>
                    {info[`${date} Beverage`]["category"].r}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Beverage`]["category"].g}
                  </Grid>
                  <Grid item xs={4}>
                    {info[`${date} Beverage`]["category"].hd}
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={4}>
                    --
                  </Grid>
                  <Grid item xs={4}>
                    --
                  </Grid>
                  <Grid item xs={4}>
                    --
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={4}>
                    --
                  </Grid>
                  <Grid item xs={4}>
                    --
                  </Grid>
                  <Grid item xs={4}>
                    --
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
