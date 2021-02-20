import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ByCategoryChart from "../charts/ByCategoryChart";
import ProfitOverTimeChart from "../charts/ProfitOverTimeChart";
import ByStateChart from "../charts/ByStateChart";
import ByCityChart from "../charts/ByCityChart";
import { useDispatch } from "react-redux";
import {
  getDataByCategory,
  getDataByCity,
  getDataByOverTime,
  getDataByState,
} from "../../actions/charts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {
    marginRight: 40,
  },
  select: {
    marginLeft: 10,
    "& .MuiOutlinedInput-input": {
      paddingTop: 6,
      paddingBottom: 6,
    },
  },
  space: {
    padding: "25px 0",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const typeArray = ["sales", "profit"];

  const yearsArray = ["2014", "2015", "2016", "2017"];

  const [salesOrProfit, setSalesOrProfit] = useState(typeArray[0]);
  const [year, setYear] = useState(yearsArray[0]);
  const [infoType, setInfoType] = useState("Segment");

  useEffect(() => {
    dispatch(getDataByCategory());
    dispatch(getDataByCity());
    dispatch(getDataByState());
    dispatch(getDataByOverTime());
  }, [dispatch]);

  const handleSalesOrProfit = (event) => {
    setSalesOrProfit(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleInfoType = (event) => {
    setInfoType(event.target.value);
  };

  return (
    <Card elevation={2} className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" className={classes.box}>
            <Typography variant="body2">Sales | Profit</Typography>
            <Select
              variant="outlined"
              value={salesOrProfit}
              onChange={handleSalesOrProfit}
              className={classes.select}
            >
              {typeArray.map((value) => (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <Typography variant="body2">Year</Typography>
            <Select
              variant="outlined"
              value={year}
              onChange={handleYear}
              className={classes.select}
            >
              {yearsArray.map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box className={classes.space}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={6}>
              <ByCategoryChart
                year={year}
                salesOrProfit={salesOrProfit}
                infoType={infoType}
                handleInfoType={handleInfoType}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfitOverTimeChart year={year} salesOrProfit={salesOrProfit} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ByStateChart year={year} salesOrProfit={salesOrProfit} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ByCityChart year={year} salesOrProfit={salesOrProfit} />
            </Grid> 
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Dashboard;