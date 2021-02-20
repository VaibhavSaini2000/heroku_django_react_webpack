import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { HorizontalBar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { getDataByCity } from "../../actions/charts";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 80,
    margin: "0 30px",
    "& .MuiOutlinedInput-input": {
      paddingTop: 6,
      paddingBottom: 6,
    },
  },
  title: {
    fontWeight: 300,
    marginBottom: 4,
  },
  loader: {
    height: 300,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ByCityChart = ({ year, salesOrProfit }) => {
  const classes = useStyles();

  const [number, setNumber] = useState(10);

  const allData = useSelector((state) => state.chartData.byCity);

  let data;
  if (allData && allData[year]) {
    data = allData[year]
      .slice()
      .sort((a, b) => b[salesOrProfit] - a[salesOrProfit])
      .slice(0, number);
  }

  const handleNumberChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setNumber(value);
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" align="left" className={classes.title}>
          {salesOrProfit} by city
        </Typography>
        <Box>
          <Typography variant="body2" align="center" className={classes.title}>
            Top N Cities
          </Typography>
          <TextField
            type="number"
            variant="outlined"
            className={classes.input}
            value={number}
            onChange={handleNumberChange}
          />
        </Box>
      </Box>
      {data ? (
        <HorizontalBar
          data={{
            labels: data.map((type) => type["City"]),
            datasets: [
              {
                label: salesOrProfit,
                data: data.map((type) => type[salesOrProfit]),
                // backgroundColor: colorsArray,
                fill: false,
              },
            ],
          }}
          options={{
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                      return `${+value / 1000}k`;
                    },
                  },
                },
              ],
            },
          }}
        />
      ) : (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ByCityChart;