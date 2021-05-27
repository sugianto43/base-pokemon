/* eslint-disable array-callback-return */
import { React, useState } from "react";
import "./HomePage.css";
import Card from "./Card";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useQuery, gql } from "@apollo/client";
import Loading from "./Loading";



const POKEMONS_QUERY_APOLLO = gql`
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
  const [filteredData, setFilteredData] = useState('')
  const options = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
  
  const { data, loading, error } = useQuery(POKEMONS_QUERY_APOLLO);

  if (loading) return <Loading/>;
  if (error) return <pre>{error.message}</pre>

  console.log(data.pokemons)

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
        {data.pokemons.filter((val) => {
            if (setFilteredData === "") {
              return val;
            } else if (val.types.join(' ').toLowerCase().includes(filteredData.toLowerCase())) {
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
