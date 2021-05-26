import { React, useEffect, useState } from "react";
import axios from "axios";
import "./DetailPage.css";
import { useParams } from "react-router";

const GRAPHQL_POKEMON = "https://graphql-pokemon2.vercel.app";
const POKEMON_QUERY = `
{
    pokemon(id: "UG9rZW1vbjowMDQ=", name: "Charmander") {
            id
            name
            image
            weight {
              minimum
              maximum
            }
            height {
              minimum
              maximum
            }
            classification
            types
            attacks {
              fast {
                name
              }
              special {
                name
              }
            }
            resistant
            weaknesses
            evolutions{
              name
              image
            }
          }
  }
`;

function DetailPage() {
const params = useParams();
console.log( typeof params.name)


  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(GRAPHQL_POKEMON, {
        query: POKEMON_QUERY,
      })
      .then((res) => {
        setData(res.data.data.pokemon);
      });
  }, [params.id, params.name]);

  return (
    <div className="detail-container">
      <div className="left-section">
        <div className="image-card">
          <img src={data.image} alt={data.name} />
          <p>{data.name}</p>
        </div>
        <div className="evolutions">
          <p className="title">Evolutions</p>
          <div className="image-container">
            {data?.evolutions?.map((item, idx) => (
              <div className="image-wrap" key={idx}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="weight-range">
          <p className="title">Weight Range</p>
          <p className="content">
            {data?.weight?.minimum} - {data?.weight?.maximum}
          </p>
        </div>

        <div className="height-range">
          <p className="title">Height Range</p>
          <p className="content">
            {data?.height?.minimum} - {data?.height?.maximum}
          </p>
        </div>

        <div className="classification">
          <p className="title">Classification</p>
          <p className="content">{data.classification}</p>
        </div>

        <div className="types">
          <p className="title">Types</p>
          <ul>
            {data?.types?.map((item, idx) => {
             return <li key={idx}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Fast Attacks</p>
          <ul>
            {data?.attacks?.fast?.map((item, idx) => {
              return <li key={idx}>{item.name}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Special Attacks</p>
          <ul>
            {data?.attacks?.special.map((item, idx) => {
              return <li key={idx}>{item.name}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Resistances</p>
          <ul>
            {data?.resistant?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Weaknesses</p>
          <ul>
            {data?.weaknesses?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
