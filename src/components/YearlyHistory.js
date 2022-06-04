import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { WEATHER_FINAL_API } from "../API";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const YearlyHistory = () => {
  const [data, setData] = useState("");
  const { id } = useParams();
  const format = "json";
  const id_url = `${WEATHER_FINAL_API}&q=${id}&format=${format}&num_of_days=5&&mca=yes`;

  useEffect(() => {
    fetchData();
  }, []);

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
      {data ? (
        <Cards>
          <Card>
            <h4>Months</h4>
            <h4>Avg Minimum Temperature (&deg;C | &deg;F)</h4>
            <h4>Avg Maximum Temperature (&deg;C | &deg;F)</h4>
            <h4>Avg Daily Rainfall</h4>
          </Card>
          <Scroll>
            {data.ClimateAverages[0].month.map((e) => (
              <TableCard key={e.index}>
                <h5>{e.name}</h5>
                <h2>
                  {Number(e.avgMinTemp).toFixed(0)}&deg;C|
                  {Number(e.avgMinTemp_F).toFixed(0)}
                  &deg;F
                </h2>
                <h2>
                  {Number(e.absMaxTemp).toFixed(0)}&deg;C|
                  {Number(e.absMaxTemp_F).toFixed(0)}&deg;F
                </h2>
                <h2>{e.avgDailyRainfall}</h2>
              </TableCard>
            ))}
          </Scroll>
        </Cards>
      ) : (
        ""
      )}
    </Main>
  );
};
const Main = styled.div`
  p {
    font-size: 2rem;
  }
  margin: 2rem 0rem;
`;
const Scroll = styled.div`
  height: 340px;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
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

const Card = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease-in-out;
    border: 1.5px solid #295e8f;
    box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.1),
      0px 30px 30px rgba(0, 0, 0, 0.1);
  }
  align-items: center;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 0.2px solid lightgray;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.1);

  h5 {
    font-size: 1.2rem;
    color: #417aaf;
  }
  h2,
  h3,
  h4 {
    font-weight: 700;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 1150px) {
    padding: 1.2rem;
    h2,
    h3,
    h4,
    h5 {
      font-size: 1.5vw;
    }
  }
`;
export default YearlyHistory;
