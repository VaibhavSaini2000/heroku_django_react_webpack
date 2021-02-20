import React from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chart from "react-google-charts";
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

const ByStateChart = ({ year, salesOrProfit }) => {
  const classes = useStyles();
  const values = useSelector((state) => state.chartData.byState);

  let data;

  if (values && values[year]) {
    const newValues = values[year].map((v) => [v.state, v[salesOrProfit]]);
    data = [["States", salesOrProfit], ...newValues];
  }
  //   ["States", "Latitude"],
  //   ["Oklahoma", 36],
  //   ["Angola", -8],

  return (
    <div>
      {data ? (
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="GeoChart"
          data={data}
          options={{
            region: "019", // America
            colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
            backgroundColor: "#81d4fa",
            datalessRegionColor: "#f8bbd0",
            defaultColor: "#f5f5f5",
          }}
          // Note: you will need to get a mapsApiKey for your project.
          // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
          mapsApiKey="YOUR_KEY_HERE"
          rootProps={{ "data-testid": "4" }}
        />
      ) : (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ByStateChart;