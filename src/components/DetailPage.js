import { React } from "react";
import "./DetailPage.css";
import { useParams } from "react-router";
import { useQuery, gql } from "@apollo/client";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const POKEMON_QUERY = gql`
  query Pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
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
      evolutions {
        id
        name
        image
      }
    }
  }
`;

function DetailPage() {
  const params = useParams();

  const { data, loading, error } = useQuery(POKEMON_QUERY, {
    variables: {
      id: params.id,
      name: params.name,
    },
  });

  if (loading || !data) return <Loading />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="detail-container">
      <div className="left-section">
        <div className="image-card">
          <img src={data.pokemon?.image} alt={data.pokemon?.name} />
          <p>{data.pokemon?.name}</p>
        </div>
        {!data?.pokemon?.evolutions ? (
          ""
        ) : (
          <div className="evolutions">
            <p className="title">Evolutions</p>
            <div style={{display: 'flex'}}>
              {data?.pokemon?.evolutions?.map((item, idx) => (
                <Link
                  to={`/detail/${item.name}/${item.id}`}
                  style={{ textDecoration: "none" }}
                  className="image-container"
                >
                  <div className="image-wrap" key={idx}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                </Link>
              ))}
              </div>
          </div>
        )}
      </div>
      <div className="right-section">
        <div className="weight-range">
          <p className="title">Weight Range</p>
          <p className="content">
            {data?.pokemon?.weight?.minimum} - {data?.pokemon?.weight?.maximum}
          </p>
        </div>

        <div className="height-range">
          <p className="title">Height Range</p>
          <p className="content">
            {data?.pokemon?.height?.minimum} - {data?.pokemon?.height?.maximum}
          </p>
        </div>

        <div className="classification">
          <p className="title">Classification</p>
          <p className="content">{data.pokemon?.classification}</p>
        </div>

        <div className="classification">
          <p className="title">Types</p>
          <p className="content">{data.pokemon.types.join(", ")}</p>
        </div>

        <div className="types">
          <p className="title">Fast Attacks</p>
          <ul>
            {data?.pokemon?.attacks?.fast?.map((item, idx) => {
              return <li key={idx}>{item.name}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Special Attacks</p>
          <ul>
            {data?.pokemon?.attacks?.special.map((item, idx) => {
              return <li key={idx}>{item.name}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Resistances</p>
          <ul>
            {data?.pokemon?.resistant?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="types">
          <p className="title">Weaknesses</p>
          <ul>
            {data?.pokemon?.weaknesses?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
