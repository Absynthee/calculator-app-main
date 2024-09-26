import React, { useState, useEffect } from "react";
import { applyTheme } from './themeManager';
import "./App.css";
import { inputDigit, inputDecimal, clearDisplay, inputOperator, handleEquals, formatNumber } from "./calculatorFunctions";

function App() {
  const [display, setDisplay] = useState<string>("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'theme1' | 'theme2' | 'theme3'>('theme1');
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      setActiveKey(key === 'Delete' || key === 'Backspace' ? 'DEL' : key);

      if (/^[0-9]$/.test(key)) {
        inputDigit(key, display, waitingForOperand, setDisplay, setWaitingForOperand);
      } else if (key === '.') {
        inputDecimal(display, waitingForOperand, setDisplay, setWaitingForOperand);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const operatorMap: { [key: string]: string } = { '*': 'x' };
        inputOperator(operatorMap[key] || key, display, prevValue, operator, setPrevValue, setDisplay, setWaitingForOperand, setOperator);
      } else if (key === 'Enter' || key === '=') {
        handleEquals(display, prevValue, operator, setDisplay, setPrevValue, setOperator, setWaitingForOperand);
      } else if (key === 'Escape') {
        clearDisplay(setDisplay, setPrevValue, setOperator, setWaitingForOperand);
      } else if (key === 'Backspace') {
        if (!waitingForOperand) {
          const newDisplay = display.slice(0, -1).replace(/,/g, '');
          setDisplay(newDisplay === '' ? '0' : formatNumber(newDisplay));
        }
      }
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
      setActiveKey(null);
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [display, prevValue, operator, waitingForOperand]);
  
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>calc</h1>
        <div className="toggle">
        <input
    type="radio"
    id="theme1"
    name="theme"
    value="theme1"
    checked={currentTheme === 'theme1'}
    onChange={() => setCurrentTheme('theme1')}
    className="theme1"
  />
  <input
    type="radio"
    id="theme2"
    name="theme"
    value="theme2"
    checked={currentTheme === 'theme2'}
    onChange={() => setCurrentTheme('theme2')}
    className="theme2"
  />
  <input
    type="radio"
    id="theme3"
    name="theme"
    value="theme3"
    checked={currentTheme === 'theme3'}
    onChange={() => setCurrentTheme('theme3')}
    className="theme3"
  />
          <span className="slider" />
        </div>
      </header>

      <main>
        <div className="Calc-container">
          <span className="Output">{formatNumber(display)} </span>
          <div className="Calc-buttons">
            <span onClick={() => inputDigit("7", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '7' ? 'active' : ''}`}>7</span>
            <span onClick={() => inputDigit("8", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '8' ? 'active' : ''}`}>8</span>
            <span onClick={() => inputDigit("9", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '9' ? 'active' : ''}`}>9</span>
            <span onClick={() => {
    if (!waitingForOperand) {
      const newDisplay = display.slice(0, -1).replace(/,/g, '');
      setDisplay(newDisplay === '' ? '0' : formatNumber(newDisplay));
    }
  }}
  className={`calc-button Alt-1 ${activeKey === 'DEL' ? 'active' : ''}`}
>DEL</span>
            <span onClick={() => inputDigit("4", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '4' ? 'active' : ''}`}>4</span>
            <span onClick={() => inputDigit("5", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '5' ? 'active' : ''}`}>5</span>
            <span onClick={() => inputDigit("6", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '6' ? 'active' : ''}`}>6</span>
            <span onClick={() => inputOperator("+", display, prevValue, operator, setPrevValue, setDisplay, setWaitingForOperand, setOperator)} className={`calc-button ${activeKey === '+' ? 'active' : ''}`}>+</span>
            <span onClick={() => inputDigit("1", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '1' ? 'active' : ''}`}>1</span>
            <span onClick={() => inputDigit("2", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '2' ? 'active' : ''}`}>2</span>
            <span onClick={() => inputDigit("3", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '3' ? 'active' : ''}`}>3</span>
            <span onClick={() => inputOperator("-", display, prevValue, operator, setPrevValue, setDisplay, setWaitingForOperand, setOperator)} className={`calc-button ${activeKey === '-' ? 'active' : ''}`}>-</span>
            <span onClick={() => inputDecimal(display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '.' ? 'active' : ''}`}>.</span>
            <span onClick={() => inputDigit("0", display, waitingForOperand, setDisplay, setWaitingForOperand)} className={`calc-button ${activeKey === '0' ? 'active' : ''}`}>0</span>
            <span onClick={() => inputOperator("/", display, prevValue, operator, setPrevValue, setDisplay, setWaitingForOperand, setOperator)} className={`calc-button ${activeKey === '/' ? 'active' : ''}`}>/</span>
            <span onClick={() => inputOperator("x", display, prevValue, operator, setPrevValue, setDisplay, setWaitingForOperand, setOperator)} className={`calc-button ${activeKey === 'x' || activeKey === '*' ? 'active' : ''}`}>x</span>
            <div className="Sub-grid">
              <span onClick={() => clearDisplay(setDisplay, setPrevValue, setOperator, setWaitingForOperand)} className={`calc-button Alt-1 Reset-button ${activeKey === 'Escape' ? 'active' : ''}`}>RESET</span>
              <span onClick={() => handleEquals(display, prevValue, operator, setDisplay, setPrevValue, setOperator, setWaitingForOperand)} className={`calc-button Alt-2 Equal-button ${activeKey === 'Enter' || activeKey === '=' ? 'active' : ''}`}>=</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

