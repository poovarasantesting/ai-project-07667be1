import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(display);
    } else if (operation) {
      const currentValueNum = parseFloat(currentValue);
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValueNum + inputValue;
          break;
        case '-':
          newValue = currentValueNum - inputValue;
          break;
        case '×':
          newValue = currentValueNum * inputValue;
          break;
        case '÷':
          newValue = currentValueNum / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setCurrentValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateResult = () => {
    if (!currentValue || !operation) return;

    performOperation('=');
    setOperation(null);
  };

  const buttons = [
    { text: 'C', type: 'function', action: clearAll },
    { text: '±', type: 'function', action: () => setDisplay(String(parseFloat(display) * -1)) },
    { text: '%', type: 'function', action: () => setDisplay(String(parseFloat(display) / 100)) },
    { text: '÷', type: 'operator', action: () => performOperation('÷') },
    { text: '7', type: 'digit', action: () => inputDigit('7') },
    { text: '8', type: 'digit', action: () => inputDigit('8') },
    { text: '9', type: 'digit', action: () => inputDigit('9') },
    { text: '×', type: 'operator', action: () => performOperation('×') },
    { text: '4', type: 'digit', action: () => inputDigit('4') },
    { text: '5', type: 'digit', action: () => inputDigit('5') },
    { text: '6', type: 'digit', action: () => inputDigit('6') },
    { text: '-', type: 'operator', action: () => performOperation('-') },
    { text: '1', type: 'digit', action: () => inputDigit('1') },
    { text: '2', type: 'digit', action: () => inputDigit('2') },
    { text: '3', type: 'digit', action: () => inputDigit('3') },
    { text: '+', type: 'operator', action: () => performOperation('+') },
    { text: '0', type: 'digit', action: () => inputDigit('0'), wide: true },
    { text: '.', type: 'digit', action: inputDecimal },
    { text: '=', type: 'operator', action: calculateResult },
  ];

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-slate-800 text-white rounded-t-lg">
        <CardTitle className="text-right text-3xl font-light py-2 px-4 overflow-hidden">
          {display}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.action}
              className={`h-14 md:h-16 text-lg font-medium ${
                button.wide ? 'col-span-2' : ''
              } ${
                button.type === 'operator'
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : button.type === 'function'
                  ? 'bg-slate-300 hover:bg-slate-400 text-slate-800'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}