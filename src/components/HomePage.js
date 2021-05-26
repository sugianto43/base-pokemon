import { React, useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const GRAPHQL_POKEMON = "https://graphql-pokemon2.vercel.app";
const POKEMONS_QUERY = `
  {
    pokemons(first: 300) {
      id
      name
      image
    }
  }
`;

function HomePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(GRAPHQL_POKEMON, {
        query: POKEMONS_QUERY,
      })
      .then((res) => {
        setData(res.data.data.pokemons);
      });
  }, []);
  return (
    <>
      <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} className="image" />
            <p className="name">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
