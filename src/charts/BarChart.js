import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
const BarChart = ({ dataa }) => {
  const [data, setData] = useState([]);
  const update = useRef(false);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = () => {
    const data = dataa.ClimateAverages[0].month.map((e) => {
      return {
        monthName: e.name.substring(0, 3),
        avgMinTempC: e.avgMinTemp,
        absMaxTempC: Number(e.absMaxTemp).toFixed(1),
        avgMinTempF: e.avgMinTemp_F,
        absMaxTempF: e.absMaxTemp_F,
      };
    });
    setData(data);
  };

  useEffect(() => {
    if (update.current) {
      d3.selectAll("g").remove();
      d3.selectAll("text").remove();
    } else {
      update.current = true;
    }
    drawMin();
    drawMax();
  }, [data]);

  const drawMin = () => {
    const svg = d3.select("#svg1");
    const margin = 70;
    const width = 800 - 5 * margin;
    const height = 600 - 5 * margin;

    const xScale = d3
      .scaleBand()
      .domain(
        data.map((e) => {
          return e.monthName;
        })
      )
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.avgMinTempC;
        }),
      ])
      .range([height, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin + 60}, ${margin})`);
    svg
      .attr("width", "100%")
      // .attr("height", "100%")
      .attr("viewBox", "0 0 700 350");
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
      .attr("y", (g) => yScale(g.avgMinTempC))
      .attr("height", (g) => height - yScale(g.avgMinTempC))
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
          .attr("y", (a) => yScale(a.avgMinTempC) + 30)
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            const divergence = (a.avgMinTempC - actual.avgMinTempC).toFixed(1);

            let text = "";
            if (divergence > 0) text += "+";
            text += `${a.avgMinTempC}`;

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
      .attr("y", margin + 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Temperature");

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width * 0.8)
      .attr("y", height + margin * 1.6)
      .attr("text-anchor", "middle")
      .text("Month");

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 1.5 + margin)
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .text("Minimum Monthly Average Temperature (Celsius)");
  };
  const drawMax = () => {
    const svg = d3.select("#svg2");
    const margin = 70;
    const width = 800 - 5 * margin;
    const height = 600 - 5 * margin;

    const xScale = d3
      .scaleBand()
      .domain(
        data.map((e) => {
          return e.monthName;
        })
      )
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.absMaxTempC;
        }),
      ])
      .range([height, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin + 60}, ${margin})`);
    svg
      .attr("width", "100%")
      // .attr("height", "100%")
      .attr("viewBox", "0 0 700 350");
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
      .attr("y", (g) => yScale(g.absMaxTempC))
      .attr("height", (g) => height - yScale(g.absMaxTempC))
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
          .attr("y", (a) => yScale(a.absMaxTempC) + 30)
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            const divergence = (a.absMaxTempC - actual.absMaxTempC).toFixed(1);

            let text = "";
            if (divergence > 0) text += "+";
            text += `${a.absMaxTempC}`;

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
      .attr("y", margin + 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Temperature");

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width * 0.8)
      .attr("y", height + margin * 1.6)
      .attr("text-anchor", "middle")
      .text("Month");

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 1.5 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text("Maximum Monthly Average Temperature (Celsius)");
  };
  return (
    <Chart>
      <div id="layout">
        <div id="container">
          <svg id="svg1" ref={update} />
          <svg id="svg2" ref={update} />
        </div>
      </div>
    </Chart>
  );
};

const Chart = styled.div`
  text-align: center;
  margin: 5rem;
  body {
    font-family: "Open Sans", sans-serif;
  }

  div#layout {
    text-align: center;
  }

  div#container {
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3),
      0px 10px 10px rgba(0, 0, 0, 0.3);
    width: 850px;
    /* height: 1000px; */
    margin: auto;
    border-radius: 10px;
    background-color: #2f4a6d;
  }
  @media screen and (max-width: 374px) {
    div#container {
      width: 200px;
    }
  }
  @media screen and (min-width: 374px) and (max-width: 430px) {
    div#container {
      width: 280px;
    }
  }
  @media screen and (min-width: 430px) and (max-width: 570px) {
    div#container {
      width: 350px;
    }
  }
  @media screen and (min-width: 570px) and (max-width: 700px) {
    div#container {
      width: 480px;
    }
  }
  @media screen and (min-width: 700px) and (max-width: 900px) {
    div#container {
      width: 600px;
    }
  }
  @media screen and (min-width: 900px) and (max-width: 1050px) {
    div#container {
      width: 650px;
    }
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
