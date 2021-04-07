import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./Card.css";

const Card = (props) => {
  const history = useHistory()
  
   
  const { name, image, id } = props.vehicle;
  
  const handleRide = () => {
    history.push('./destination');
  
  };
  return (
    <div className="all-cards">
      <Link to='/destination'>
        <div onClick={handleRide} className="card-name">
          <img src={image} alt="" />
          <h4>{name}</h4>
        </div>
      </Link>
    </div>
  );
};

export default Card;
