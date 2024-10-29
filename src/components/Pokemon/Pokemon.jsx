import { Link } from "react-router-dom";
import "./pokemon.css";

function Pokemon({ name, image,id }) {
  return (
    <>
      <div className="pokemon">

      <Link className="link" to={`/pokemon/${id}`}>
      <div>{name}</div>

<div>
  <img src={image} alt="" />
</div>
      </Link>

      </div>
    </>
  );
}

export default Pokemon;
