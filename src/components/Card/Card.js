import React from "react";
import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={classes.Card}>
      <div className={classes[props.color]}>
        {props.color === "diamond" ? null : props.color}
      </div>
      <p>{props.value}</p>
    </div>
  );
};
export default Card;
