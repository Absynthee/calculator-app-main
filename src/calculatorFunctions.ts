// src/calculatorFunctions.ts

export const performCalculation = (op: string, a: number, b: number): number => {
    let result: number;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "x":
        result = a * b;
        break;
      case "/":
        result = b !== 0 ? a / b : NaN;
        break;
      default:
        return b;
    }
    
    // Convert to string and limit to 15 significant digits
    return Number(result.toPrecision(15));
  };
  
    
  export const inputDigit = (
    digit: string,
    display: string,
    waitingForOperand: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setWaitingForOperand: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (waitingForOperand) {
      setDisplay(formatNumber(digit));
      setWaitingForOperand(false);
    } else {
      const newDisplay = display === "0" ? digit : display.replace(/,/g, '') + digit;
      if (newDisplay.replace(/[.,]/g, '').length <= 12) {
        setDisplay(formatNumber(newDisplay));
      }
    }
  };
  
    
    
  export const inputDecimal = (
    display: string,
    waitingForOperand: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setWaitingForOperand: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };
  
  export const clearDisplay = (
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setPrevValue: React.Dispatch<React.SetStateAction<number | null>>,
    setOperator: React.Dispatch<React.SetStateAction<string | null>>,
    setWaitingForOperand: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };
  
  export const inputOperator = (
    nextOperator: string,
    display: string,
    prevValue: number | null,
    operator: string | null,
    setPrevValue: React.Dispatch<React.SetStateAction<number | null>>,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setWaitingForOperand: React.Dispatch<React.SetStateAction<boolean>>,
    setOperator: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const inputValue = parseFloat(display.replace(/,/g, ''));
  
    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = performCalculation(operator, currentValue, inputValue);
      setPrevValue(newValue);
      setDisplay(formatNumber(newValue.toString()));
    } else {
      // This case handles when an operator is pressed after 'equals'
      setPrevValue(inputValue);
    }
  
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };
  
    
  export const handleEquals = (
    display: string,
    prevValue: number | null,
    operator: string | null,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    setPrevValue: React.Dispatch<React.SetStateAction<number | null>>,
    setOperator: React.Dispatch<React.SetStateAction<string | null>>,
    setWaitingForOperand: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!operator || prevValue === null) return;
  
    const inputValue = parseFloat(display.replace(/,/g, ''));
    const result = performCalculation(operator, prevValue, inputValue);
    const formattedResult = formatNumber(result.toString());
    setDisplay(formattedResult);
    setPrevValue(result); // Set the result as the new prevValue
    setOperator(null);
    setWaitingForOperand(true);
  };
  
    
    
  export const formatNumber = (num: string): string => {
    // Remove any existing commas
    num = num.replace(/,/g, '');
    
    const parts = num.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';
  
    // Limit the total number of digits to 15
    const totalDigits = integerPart.length + decimalPart.length;
    if (totalDigits > 15) {
      if (integerPart.length >= 15) {
        // If integer part is already 15 or more digits, truncate it
        integerPart = integerPart.slice(0, 15);
        decimalPart = '';
      } else {
        // Otherwise, truncate the decimal part
        decimalPart = decimalPart.slice(0, 15 - integerPart.length);
      }
    }
  
    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    // Combine integer and decimal parts
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  };
    
