// import { render } from "@testing-library/react";
import React, { useState, useRef } from "react";
import "./App.css";
import Card from "./components/Card/Card";
let deck = [];
const setOfColors = ["diamond", "trefl", "heart", "spade"];
const setOfValues = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "jack",
  "queen",
  "king",
  "Ace",
];
for (let i in setOfColors) {
  for (let j in setOfValues) {
    deck.push({ color: setOfColors[i], value: setOfValues[j] });
  }
}
deck.sort(() => 0.5 - Math.random());
function App() {
  const [usersCards, setUserCards] = useState([]);
  const [number, setNumber] = useState(0);
  const takeCardBtn = useRef();
  const sumOfCards = (CardsToSum, deck) => {
    let isOverTwentyOne = false;
    console.log(CardsToSum, deck.props.value);
    const newArr = CardsToSum.map((item) => {
      return item.props.value;
    });
    console.log("newArr: " + newArr);
    newArr.push(deck.props.value);
    console.log(newArr);
    // CardsToSum.push(deck);
    const sum = newArr.reduce((totalValue, value) => {
      if (totalValue !== "tooMuch") {
        if (
          typeof value === "string" &&
          (value.toLowerCase() === "king" ||
            value.toLowerCase() === "ace" ||
            value.toLowerCase() === "queen" ||
            value.toLowerCase() === "jack")
        ) {
          return 10 + totalValue > 21 ? "tooMuch" : 10 + totalValue;
        }
        console.log(value);
        return value + totalValue > 21 ? "tooMuch" : value + totalValue;
      }
    }, 0);
    // if (sum === "tooMuch") {
    //   isOverTwentyOne = true;
    // }
    console.log(`Suma kart ${sum}`);
    // console.log(takeCardBtn);
    if (sum === "tooMuch") {
      takeCardBtn.current.disabled = true;
    }
  };
  const showCardForUser = () => {
    const renderDeck = (
      <Card
        color={deck[number].color}
        value={deck[number].value}
        key={number}
      />
    );
    setNumber((prevState) => ++prevState);
    // console.log(number);

    setUserCards((prevState) => [...prevState, renderDeck]);
    // console.log(usersCards);
    // console.log(deck);
    deck.shift();
    sumOfCards(usersCards, renderDeck);
  };

  return (
    <>
      <div className="App">{}</div>
      <button onClick={showCardForUser} ref={takeCardBtn}>
        Take Card
      </button>
      {usersCards}
      {/* <Card color={card.color} value={card.value} /> */}
      {/* {card.map((item) => {
        return <Card color={item.color} value={item.value} />;
      })} */}
    </>
  );
}

export default App;
