// import { render } from "@testing-library/react";
import React, { useState, useRef, useEffect } from "react";
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
    deck.push({ color: setOfColors[i], value: setOfValues[j], key: i + j });
  }
}
deck.sort(() => 0.5 - Math.random());
function App() {
  const [usersCards, setUserCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [number, setNumber] = useState(0);
  const takeCardBtn = useRef();
  const userInfo = useRef();
  const score = useRef();
  const computerInfo = useRef();
  const compCards = [];
  const disableButtons = () => {
    takeCardBtn.current.childNodes.forEach((item) => (item.disabled = true));
  };
  const sumOfCards = (CardsToSum, deck) => {
    // let isOverTwentyOne = false;
    // console.log(CardsToSum, deck.props.value);
    const newArr = CardsToSum.map((item) => {
      return item.props.value;
    });
    console.log("newArr: " + newArr);
    newArr.push(deck.props.value);
    console.log(newArr);
    // CardsToSum.push(deck);

    const sum = newArr.reduce((totalValue, value) => {
      if (typeof value === "string") {
        if (
          value.toLowerCase() === "king" ||
          value.toLowerCase() === "queen" ||
          value.toLowerCase() === "jack"
        ) {
          return 10 + totalValue > 21 ? "tooMuch" : 10 + totalValue;
        }
        if (value.toLowerCase() === "ace") {
          return 11 + totalValue > 21 ? 1 + totalValue : 11 + totalValue;
        }
      }
      // console.log(value);
      return value + totalValue > 21 ? "tooMuch" : value + totalValue;
    }, 0);
    // if (sum === "tooMuch") {
    //   isOverTwentyOne = true;
    // }
    console.log(`Suma kart ${sum}`);
    // console.log(takeCardBtn);
    if (sum === 21) {
      disableButtons();
      ComputerTurn();

      // takeCardBtn.current.disabled = true;
    } else if (sum === "tooMuch") {
      score.current.innerHTML = "Computer wygrał";
      disableButtons();
    }
    return sum;
  };
  const compareScores = () => {
    if (userInfo.current.innerHTML > computerInfo.current.innerHTML) {
      // console.log(s);
      score.current.innerHTML = `Gracz wygrał, Komputer miał: ${computerInfo.current.innerHTML}, a Gracz: ${userInfo.current.innerHTML}`;
    } else if (userInfo.current.innerHTML < computerInfo.current.innerHTML) {
      score.current.innerHTML = "Komputer wygrał";
    } else {
      score.current.innerHTML = "Remis";
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
    const userSum = sumOfCards(usersCards, renderDeck);
    // console.log(info.current);
    userInfo.current.innerHTML = userSum;
  };

  const ComputerTurn = () => {
    disableButtons();
    const renderDeck = (
      <Card
        color={deck[number].color}
        value={deck[number].value}
        key={deck[number].key}
      />
    );
    setNumber((prevState) => ++prevState);
    // console.log(number);

    // setComputerCards((prevState) => [...prevState, renderDeck]);
    compCards.push(renderDeck);
    // console.log(`Karty komputera  ${renderDeck}`);
    // console.log(deck);
    deck.shift();
    // useEffect(() => {

    // const userSum = sumOfCards(renderDeck);

    const newArr = compCards.map((item) => {
      return item.props.value;
    });
    console.log("Karty Komputer: " + newArr);
    // newArr.push(deck.props.value);
    // console.log(newArr);
    // CardsToSum.push(deck);

    const sum = newArr.reduce((totalValue, value) => {
      if (typeof value === "string") {
        if (
          value.toLowerCase() === "king" ||
          value.toLowerCase() === "queen" ||
          value.toLowerCase() === "jack"
        ) {
          return 10 + totalValue > 21 ? "tooMuch" : 10 + totalValue;
        }
        if (value.toLowerCase() === "ace") {
          return 11 + totalValue > 21 ? 1 + totalValue : 11 + totalValue;
        }
      }
      // console.log(value);
      return value + totalValue > 21 ? "tooMuch" : value + totalValue;
    }, 0);
    // if (sum === "tooMuch") {
    //   isOverTwentyOne = true;
    // }
    console.log(`Suma kart ${sum}`);
    computerInfo.current.innerHTML = sum;
    if (sum < 17 && typeof sum === "number") {
      ComputerTurn();
    } else {
      setComputerCards(compCards);
      compareScores();
    }

    // console.log(takeCardBtn);
    // if (sum === "tooMuch" || sum === 21) {
    //   // disableButtons();
    //   // ComputerTurn();
    //   // takeCardBtn.current.disabled = true;
    // }
    // return sum;

    // setTimeout(() => {
    //   if (userSum < 17 || typeof userSum === "number") {
    //     ComputerTurn();
    //   }
    // }, 200);

    //   while (userSum < 17 || typeof userSum !== "string") {
    //     ComputerTurn();
    //   }
    // }, [computerCards]);

    // console.log(computerCards, renderDeck, userSum);
  };

  // useEffect(() => {
  //   ComputerTurn(); // This is be executed when `loading` state changes
  // }, [computerCards]);
  return (
    <>
      <div className="App">{}</div>
      <div className="userConsole" ref={takeCardBtn}>
        <button onClick={showCardForUser}>Take Card</button>
        <button onClick={ComputerTurn}>Stand</button>
      </div>

      <div>Karty Gracza: </div>
      <div ref={userInfo}></div>
      <div className="card-container">{usersCards}</div>
      <div>Karty Komputera: </div>
      <div ref={computerInfo}></div>
      <div className="card-container">{computerCards}</div>
      <div className="score" ref={score}>
        Game in progress
      </div>
      {/* <Card color={card.color} value={card.value} /> */}
      {/* {card.map((item) => {
        return <Card color={item.color} value={item.value} />;
      })} */}
    </>
  );
}

export default App;
