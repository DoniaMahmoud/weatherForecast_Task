import { useEffect, useState } from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

const PieChart = ({ dataa }) => {
  const [month, setMonth] = useState([]);
  const [rain, setRain] = useState([]);
  const colors = [
    "#fafa6e",
    "#c4ec74",
    "#92dc7e",
    "#64c987",
    "#39b48e",
    "#089f8f",
    "#00898a",
    "#08737f",
    "#215d6e",
    "#2a4858",
    "#223a47",
    "#1e333d",
  ];
  useEffect(() => {
    const monthValue = dataa.ClimateAverages[0].month.map((e) => e.name);
    const rainValue = dataa.ClimateAverages[0].month.map((e) =>
      Number(e.avgDailyRainfall)
    );
    var total = rainValue.reduce((x, y) => x + y);
    const percentage = rainValue.map((e) => ((e / total) * 100).toFixed(1));
    setMonth(monthValue);
    setRain(percentage);
    // calculatePercentage();
  }, []);

  const [data, setData] = useState({
    datasets: [
      {
        data: "",
        backgroundColor: "",
      },
    ],
    labels: "",
  });
  useEffect(() => {
    if (month) {
      setData({
        datasets: [
          {
            data: rain,
            backgroundColor: colors,
          },
        ],
        labels: month,
      });
    }
  }, [month]);

  return (
    <StyledChart>
      <h4>Monthly Average Rainfall (%)</h4>
      <div className="pie-chart">
        <Pie data={data} />
      </div>
    </StyledChart>
  );
};
const StyledChart = styled.div`
  display: block;
  h4 {
    text-align: center;
    font-size: 2rem;
    margin-top: 12rem;
    padding: 1rem;
  }
  .pie-chart {
    margin: auto;
    width: 40%;
  }
  @media screen and (max-width: 700px) {
    h4 {
      font-size: 4vw;
    }
    .pie-chart {
      width: 75%;
    }
  }
`;
export default PieChart;
