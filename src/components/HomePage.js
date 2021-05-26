/* eslint-disable array-callback-return */
import { React, useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import Card from "./Card";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const GRAPHQL_POKEMON = "https://graphql-pokemon2.vercel.app";
const POKEMONS_QUERY = `
  {
    pokemons(first: 150) {
      id
      name
      image
      types
    }
  }
`;

function HomePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState('')
  const options = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
  useEffect(() => {
    axios
      .post(GRAPHQL_POKEMON, {
        query: POKEMONS_QUERY,
      })
      .then((res) => {
        setData(res.data.data.pokemons);
        console.log('data', res.data.data.pokemons)
      });
  }, []);
  return (
    <>
      <div className="dropdown">
        <Dropdown
          options={options}
          onChange={e=>setFilteredData(e.value)}
          placeholder="Filter Base on Type"
        />
        
      </div>
      <div className="card-container">
        {data.filter((val) => {
            if (setFilteredData === "") {
              return val;
            } else if (val.types[0].toLowerCase().includes(filteredData.toLowerCase())) {
              return val;
            }
          }).map((item) => (
          <Card name={item.name} id={item.id} image={item.image} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
