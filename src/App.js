import { React, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post(GRAPHQL_POKEMON, {
      query: POKEMONS_QUERY,
    })
    .then(res=>{
      console.log(res.data.data)
      setData(res.data.data.pokemons)
    });
  },[]);
  return (
    <div className="App">
      {data?.map((item) => (
        <img src={item.image} alt={item.name} />
      ))}
    </div>
  );
}

export default App;
