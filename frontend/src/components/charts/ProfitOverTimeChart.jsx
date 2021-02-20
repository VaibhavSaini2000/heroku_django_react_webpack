import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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

const ProfitOverTimeChart = ({ year, salesOrProfit }) => {
  const classes = useStyles();

  const data = useSelector((state) => state.chartData.byOverTime);

  return (
    <div>
      <Typography variant="h6" align="left" className={classes.title}>
        {salesOrProfit} over time
      </Typography>
      {data && data[year] ? (
        <Line
          data={{
            labels: data[year].map((type) => type["month"]),
            datasets: [
              {
                label: salesOrProfit,
                data: data[year].map((type) => type[salesOrProfit]),
                // backgroundColor: colorsArray,
                fill: false,
              },
            ],
          }}
          options={{
            scales: {
              yAxes: [
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

export default ProfitOverTimeChart;