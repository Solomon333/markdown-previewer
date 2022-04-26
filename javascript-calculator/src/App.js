import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

const calculator = [
  { id: "clear", value: "C" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." }
];
const symbols = ["C", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="buttons">
    {calculator.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

function App() {

  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [keyData, setKeyData] = useState("");

  const handleEquals = () => {

    const total = eval(keyData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setKeyData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setKeyData("");
  };

  const handleNumbers = (value) => {
    if (!keyData.length) {
      setInput(`${value}`);
      setKeyData(`${value}`);
    } else {
      if (value === 0 && (keyData === "0" || input === "0")) {
        setKeyData(`${keyData}`);
      } else {
        const lastKey = keyData.charAt(keyData.length - 1);
        const isLastChatOperator =
          lastKey === "*" || symbols.includes(lastKey);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setKeyData(`${keyData}${value}`);
      }
    }
  };

  const dotKey = () => {
    const lastKey = keyData.charAt(keyData.length - 1);
    if (!keyData.length) {
      setInput("0.");
      setKeyData("0.");
    } else {
      if (lastKey === "*" || symbols.includes(lastKey)) {
        setInput("0.");
        setKeyData(`${keyData} 0.`);
      } else {
        setInput(
          lastKey === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastKey === "." || input.includes(".")
            ? `${keyData}`
            : `${keyData}.`;
        setKeyData(formattedValue);
      }
    }
  };


  const handleMathSymbols = (value) => {
    if (keyData.length) {
      setInput(`${value}`);
      const beforeLastKey = keyData.charAt(keyData.length - 2);

      const beforeLastKeySymbol =
        symbols.includes(beforeLastKey) || beforeLastKey === "*";

      const lastKey = keyData.charAt(keyData.length - 1);

      const lastKeySymbol = symbols.includes(lastKey) || lastKey === "*";

      const validSym = value === "x" ? "*" : value;
      if (
        (lastKeySymbol && value !== "-") || beforeLastKeySymbol && lastKeySymbol
      ) {
        if (beforeLastKeySymbol) {
          const updatedValue = `${keyData.substring(
            0,
            keyData.length - 2
          )}${value}`;
          setKeyData(updatedValue);
        } else {
          setKeyData(`${keyData.substring(0, keyData.length - 1)}${validSym}`);
        }
      } else {
        setKeyData(`${keyData}${validSym}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const symbol = symbols.find((sym) => sym === value);

    switch (value) {
      case "=":
        handleEquals();
        break;
      case "C":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotKey(value);
        break;
      case symbol:
        handleMathSymbols(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(keyData);
  };

  useEffect(() => {
    handleOutput();
  }, [keyData]);

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;
