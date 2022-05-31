import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

const PieChart = ({ dataa }) => {
  const [month, setMonth] = useState([]);
  const [rain, setRain] = useState([]);

  useEffect(() => {
    const monthValue = dataa.ClimateAverages[0].month.map((e) => e.name);
    const rainValue = dataa.ClimateAverages[0].month.map((e) =>
      Number(e.avgDailyRainfall)
    );
    setMonth(monthValue);
    setRain(rainValue);
  }, []);

  return (
    <StyledChart>
      <Chart
        type="pie"
        width={700}
        height={500}
        series={rain}
        options={{
          title: {
            text: " Monthly Average Rainfall",
          },
          colors: [
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
          ],
          labels: month,
        }}
      />
    </StyledChart>
  );
};

const StyledChart = styled.div`
  /* margin: 10rem; */
  h4 {
    text-align: center;
  }
  /* border: 4px solid red; */
  /* width: 70%; */
`;
export default PieChart;
