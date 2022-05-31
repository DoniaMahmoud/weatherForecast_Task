import * as d3 from "d3";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
function BarChart({ dataa }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = () => {
    const data = dataa.ClimateAverages[0].month.map((e) => {
      return {
        monthName: e.name,
        avgMinTempC: e.avgMinTemp,
        absMaxTempC: e.absMaxTemp,
        avgMinTempF: e.avgMinTemp_F,
        absMaxTempF: e.absMaxTemp_F,
      };
    });
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select("svg");
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const xScale = d3
      .scaleBand()
      .domain(data.map((e) => e.monthName))
      .range([0, width])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.avgMinTempF;
        }),
      ])
      .range([height, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(d3.axisLeft(yScale));

    const makeYLines = () => d3.axisLeft().scale(yScale);
    chart
      .append("g")
      .attr("class", "grid")
      .call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(d3.axisLeft(yScale));
    chart
      .append("g")
      .attr("class", "grid")
      .call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));

    const barGroups = chart.selectAll().data(data).enter().append("g");

    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("x", (g) => xScale(g.monthName))
      .attr("y", (g) => yScale(g.avgMinTempF))
      .attr("height", (g) => height - yScale(g.avgMinTempF))
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (actual, i) {
        d3.selectAll(".value").attr("opacity", 0);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 0.6)
          .attr("x", (a) => xScale(a.monthName) - 5)
          .attr("width", xScale.bandwidth() + 10);

        barGroups
          .append("text")
          .attr("class", "divergence")
          .attr("x", (a) => xScale(a.monthName) + xScale.bandwidth() / 2)
          .attr("y", (a) => yScale(a.avgMinTempF) + 30)
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            const divergence = (a.avgMinTempF - actual.avgMinTempF).toFixed(1);

            let text = "";
            if (divergence > 0) text += "+";
            text += `${a.avgMinTempF}F`;

            return idx !== i ? text : "";
          });
      })
      .on("mouseleave", function () {
        d3.selectAll(".value").attr("opacity", 1);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 1)
          .attr("x", (a) => xScale(a.monthName))
          .attr("width", xScale.bandwidth());

        chart.selectAll("#limit").remove();
        chart.selectAll(".divergence").remove();
      });

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Temperature");

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin)
      .attr("y", height + margin * 1.7)
      .attr("text-anchor", "middle")
      .text("Month");

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text("Minimum Monthly Average Temperature (Farenheit)");
  };

  return (
    <Chart>
      <div id="layout">
        <div id="container">
          <svg />
        </div>
      </div>
    </Chart>
  );
}

const Chart = styled.div`
  text-align: center;

  body {
    font-family: "Open Sans", sans-serif;
  }

  div#layout {
    text-align: center;
  }

  div#container {
    width: 1000px;
    height: 600px;
    margin: auto;
    background-color: #2f4a6d;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .bar {
    fill: #80cbc4;
  }

  text {
    font-size: 12px;
    fill: #fff;
  }

  path {
    stroke: gray;
  }

  line {
    stroke: gray;
  }

  line#limit {
    stroke: #fed966;
    stroke-width: 3;
    stroke-dasharray: 3 6;
  }

  .grid path {
    stroke-width: 0;
  }

  .grid .tick line {
    stroke: #9faaae;
    stroke-opacity: 0.3;
  }

  text.divergence {
    font-size: 14px;
    fill: #2f4a6d;
  }

  text.value {
    font-size: 14px;
  }

  text.title {
    font-size: 22px;
    font-weight: 600;
  }

  text.label {
    font-size: 14px;
    font-weight: 400;
  }

  text.source {
    font-size: 10px;
  }
`;
export default BarChart;
