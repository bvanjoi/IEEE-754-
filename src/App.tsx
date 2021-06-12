import React, { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Article from './article-zh.mdx';
import './article.css';
import './style.css';

/**
 * get the ieee-754 info of a number
 */
function getArr(n) {
  const bytes = new Uint8Array(8);
  const memory = new Float64Array(bytes.buffer);
  memory[0] = n;

  const arr = n.toString().split('').map(Number);
  for (let i = 0; i < 8; i++) {
    let byte = bytes[i];
    for (let j = 0; j < 8; j++) {
      arr[(8 - i) * 8 - j - 1] = byte & 1;
      byte = byte >> 1;
    }
  }
  return arr;
}

/**
 * check weather is format number.
 */
function isFormat(arr) {
  /**
   * get the sum of arr[begin..end]
   */
  function sum(arr: number[], begin, end) {
    return arr.reduce((sum, cur, index) => {
      if (index >= begin && index < end) {
        return sum + cur;
      } else {
        return sum;
      }
    }, 0);
  }

  return !(sum(arr, 1, 12) === 0 && sum(arr, 12, arr.length) !== 0);
}

const Input = ({ input, handleInput }) => {
  return (
    <div className="form">
      <div className="form-item">
        <span>Please input your number: </span>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
        />
      </div>
      <div className="form-item">
        <span> The valid number is: </span>
        <span>{parseFloat(input)}</span>
      </div>
      <div className="form-item">
        <span>The real number stored in computer is: </span>
        <span>{parseFloat(input).toPrecision(60)}</span>
      </div>
    </div>
  );
};

const Exhibition = ({ arr, num }) => {
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    setShowHidden(!isNaN(num));
  }, [num]);

  return (
    <table className="exhibition">
      <tbody>
        <tr className="title">
          <td className="s">Sign</td>
          <td className="e">Exponent</td>
          {showHidden && <td className="h">Hidden</td>}
          <td className="f">Fraction</td>
        </tr>
        <tr className="binary">
          <td className="s">
            <span className="num index-0">{arr[0]}</span>
          </td>
          <td className="e">
            {arr.map((value, index) => {
              if (index == 0 || index >= 12) {
                return;
              }
              return (
                <span key={index} className={`num index-${index}`}>
                  {value}
                </span>
              );
            })}
          </td>
          {showHidden && <td className="h">{isFormat(arr) ? 1 : 0}</td>}
          <td className="f">
            {arr.map((value, index) => {
              if (index < 12) {
                return;
              }
              return (
                <span key={index} className={`num index-${index}`}>
                  {value}
                </span>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ConvNumber = () => {
  const [input, setInput] = useState('0');

  const handleInput = (info) => {
    setInput(info);
  };

  return (
    <div>
      <Input input={input} handleInput={handleInput} />
      <hr />
      <Exhibition arr={getArr(parseFloat(input))} num={parseFloat(input)} />
    </div>
  );
};

const App = () => {
  return (
    <MDXProvider components={{ ConvNumber }}>
      <Article />
    </MDXProvider>
  );
};

export default App;
