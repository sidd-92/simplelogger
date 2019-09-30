import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    maxWidth: 500
  },
  deleteButton: {
    float: "right"
  }
}));

export default function ComplexGrid({ log, deleteMode }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {log.mealOption}
                  {log.mealType !== "None" ? ` | ${log.mealType}` : ""}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Resident : {log.category.r}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Guest : {log.category.g}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Home Delivery : {log.category.hd}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{log.date}</Typography>
            </Grid>
          </Grid>
          {deleteMode && (
            <Grid item xs>
              <Button className={classes.deleteButton} color="secondary">
                Delete
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}
