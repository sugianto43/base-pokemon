/* eslint-disable array-callback-return */
import { React, useState } from "react";
import "./HomePage.css";
import Card from "./Card";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useQuery, gql } from "@apollo/client";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroller";

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
  const [filteredData, setFilteredData] = useState("");
  const [page, setPage] = useState(9);
  const options = [
    "Normal",
    "Fire",
    "Fighting",
    "Water",
    "Flying",
    "Grass",
    "Poison",
    "Electric",
    "Ground",
    "Psychic",
    "Rock",
    "Ice",
    "Bug",
    "Dragon",
    "Ghost",
    "Dark",
    "Steel",
    "Fairy",
  ];

  const { data, loading, error } = useQuery(POKEMONS_QUERY_APOLLO);

  if (loading || !data) return <Loading />;
  if (error) return <pre>{error.message}</pre>;

  const handleLoadMore = () => {
    setPage(page + 3);
  };
  return (
    <>
      <div className="dropdown">
        <Dropdown
          options={options}
          onChange={(e) => setFilteredData(e.value)}
          placeholder="Filter Base on Type"
        />
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={page === data.pokemons.length ? false : true}
        loader={<Loading />}
      >
        <div className="card-container">
          {data?.pokemons
            ?.slice(0, page)
            .filter((val) => {
              if (setFilteredData === "") {
                return val;
              } else if (
                val.types
                  .join(" ")
                  .toLowerCase()
                  .includes(filteredData.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => (
                <Card
                  name={item.name}
                  id={item.id}
                  image={item.image}
                  key={item.id}
                />
            ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default HomePage;
