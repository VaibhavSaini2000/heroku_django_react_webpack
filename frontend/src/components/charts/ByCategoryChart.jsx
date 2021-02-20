import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { HorizontalBar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  select: {
    margin: "0 15px",
    "& .MuiOutlinedInput-input": {
      paddingTop: 6,
      paddingBottom: 6,
    },
  },
  title: {
    fontWeight: 300,
  },
  loader: {
    height: 300,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ByCategoryChart = ({ year, salesOrProfit, infoType, handleInfoType }) => {
  const classes = useStyles();

  const data = useSelector((state) => state.chartData.byCategory);

  // Converting the object into array with keys as value only.
  const infoTypeArray = Object.keys(data);

  return (
    <div>
      {infoTypeArray && infoTypeArray.length && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="body2">Type</Typography>
          <Select
            variant="outlined"
            label="type"
            value={infoType}
            onChange={handleInfoType}
            className={classes.select}
          >
            {infoTypeArray.map((value) => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
      <Typography variant="h6" align="left" className={classes.title}>
        {salesOrProfit ? salesOrProfit : ""} by
      </Typography>
      {data && data[infoType] ? (
        <HorizontalBar
          data={{
            labels: data[infoType][year].map((type) => type[infoType]),
            datasets: [
              {
                label: salesOrProfit,
                data: data[infoType][year].map((type) => type[salesOrProfit]),
                // backgroundColor: colorsArray,

                fill: true,
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

export default ByCategoryChart;