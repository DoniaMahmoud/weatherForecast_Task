import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { PAST_DATA_API } from "../API";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ErrorIcon from "../icons/warning-svgrepo-com.svg";

const MonthlyHistory = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [arrYears, setArrYears] = useState([]);
  const [arrMonths, setArrMonths] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState("");
  const { id } = useParams();
  const format = "json";
  const id_url = `${PAST_DATA_API}&q=${id}&format=${format}&date=${selectedYear}-${selectedMonth}-01&enddate=${selectedYear}-${selectedMonth}-28`;

  useEffect(() => {
    const arrayYears = range(2009, new Date().getFullYear());
    const arrayMonths = range(1, 12);
    setArrYears(arrayYears);
    setArrMonths(arrayMonths);
  }, []);
  function padLeadingZeros(num) {
    var s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => padLeadingZeros(start + idx));
  }
  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleChangeMonth = (e) => {
    setSelectedMonth(e.target.value);
  };
  const handleClick = (e) => {
    if (selectedMonth && selectedYear) {
      fetchData();
    } else {
      setErrorMsg("Both fields are required.");
    }
  };

  const fetchData = () => {
    axios
      .get(id_url)
      .then((response) => {
        var data = JSON.stringify(response.data);
        var json = JSON.parse(data);

        setData(json.data);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <Main>
      <div className="center">
        <select
          className="list"
          value={selectedYear}
          onChange={handleChangeYear}
        >
          <option>Select a Year</option>
          {arrYears.map((e) => (
            <option key={uuid()}>{e}</option>
          ))}
        </select>
        <select
          className="list"
          value={selectedMonth}
          onChange={handleChangeMonth}
        >
          <option>Select a Month</option>
          {arrMonths.map((e) => (
            <option key={uuid()}>{e}</option>
          ))}
        </select>
        <button onClick={handleClick}> Get Weather Data</button>
      </div>
      {data && selectedMonth && selectedYear ? (
        <Cards>
          <Card>
            <h4>Date</h4>
            <h4> Min Temperature (&deg;C|&deg;F)</h4>
            <h4> Max Temperature (&deg;C|&deg;F)</h4>
            <h4>uvIndex</h4>
            <h4>Sun Hour</h4>
            <h4>Snow/cm </h4>
          </Card>
          <Scroll>
            {data.weather.map((e) => (
              <TableCard key={e.date}>
                <h5>{e.date}</h5>
                <h2>
                  {Number(e.mintempC).toFixed(0)}&deg;C |
                  {Number(e.mintempF).toFixed(0)}&deg;F
                </h2>
                <h2>
                  {Number(e.maxtempC).toFixed(0)}&deg;C |
                  {Number(e.maxtempF).toFixed(0)}&deg;F
                </h2>
                <h2>{e.uvIndex}</h2>
                <h2>{e.sunHour}</h2>
                <h2>{e.totalSnow_cm}</h2>
              </TableCard>
            ))}
          </Scroll>
        </Cards>
      ) : (
        <div>
          {errorMsg !== "" && (
            <ErrorMessage>
              <img src={ErrorIcon} alt="" />
              <p>{errorMsg}</p>
            </ErrorMessage>
          )}
        </div>
      )}
    </Main>
  );
};
const Main = styled.div`
  .center {
    text-align: center;
    margin: 2rem 0rem;
  }
  button {
    background-color: #2f4a6d;
    color: white;
    padding: 0.8rem;
    text-align: center;
    text-decoration: none;
    font-size: 1.1rem;
    margin: 1rem 2rem;
    transition-duration: 0.8s;
    cursor: pointer;
    border-radius: 6px;
    border: 1.4px solid white;
    &:hover {
      background-color: white;
      color: #2f4a6d;
      transition: transform 0.5s ease-in-out;
      border: 1.5px solid #2f4a6d;
    }
  }
  select {
    background-color: white;
    border: thin solid blue;
    border-radius: 4px;
    display: inline-block;
    font: inherit;
    line-height: 1.5em;
    padding: 0.5em 3.5em 0.5em 1em;
    margin: 0rem 1rem;
    font-size: 1.2rem;
    /* reset */
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  select.list {
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + 2px),
      calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
  }

  select.list:focus {
    background-image: linear-gradient(45deg, blue 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, blue 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border-color: #224dd8;
    outline: 0;
  }

  select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  @media screen and (max-width: 610px) {
    select,
    button {
      font-size: 0.8rem;
    }
  }
`;
const Scroll = styled.div`
  height: 340px;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 13px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #417aaf;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: white;
  }
`;
const Cards = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1), 0px 20px 20px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 1150px) {
    h2,
    h3,
    h4,
    h5 {
      font-size: 1vw;
    }
  }
`;
const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2rem 0rem;
  p {
    color: white;
    padding: 0rem 0rem 0rem 0.5rem;
    font-size: 1.1rem;
  }
  img {
    width: 1.25rem;
  }
`;
const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  background-color: #295e8f;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1), 0px 20px 20px rgba(0, 0, 0, 0.1);
  h4 {
    margin: 1rem 2rem;
    color: white;
    font-weight: 600;
    font-size: 1.3rem;
  }
  @media screen and (max-width: 1150px) {
    h4 {
      margin: 0.5rem;
      font-size: 1.5vw;
    }
  }
`;
const TableCard = styled.div`
  padding: 2rem;
  align-items: center;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  border: 0.2px solid lightgray;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease-in-out;
    border: 1.5px solid #295e8f;
    box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.1),
      0px 30px 30px rgba(0, 0, 0, 0.1);
  }
  h2,
  h3,
  h4 {
    font-weight: 700;
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1.2rem;
    color: #417aaf;
  }
  @media screen and (max-width: 1150px) {
    padding: 0.8rem;
    h2,
    h3,
    h4,
    h5 {
      font-size: 1.5vw;
    }
  }
`;

export default MonthlyHistory;
