import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  const { name, id, image } = props;
  return (
    <div>
      <Link to={`/detail/${name}/${id}`} style={{ textDecoration: "none" }}>
        <div className="card" key={id}>
          <img src={image} alt={name} className="image" />
          <p className="name">{name}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
