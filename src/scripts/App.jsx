import React, { useState } from 'react';
import data from '../assets/data.json';

const App = () => {
  const [input, setInput] = useState('');

  const filteredData = data.filter(({ name }) => name).filter(({ name, kana }) => {
    if (!input) {
      return true;
    }

    return input.split(' ').every((chunk) => {
      return name.includes(chunk) || kana.includes(chunk);
    });
  });

  const onInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <h1>Hello world</h1>
      <input type="search" onInput={onInput}/>
      <ul>
        {filteredData.map(({ name, separation, description}) => (
          <div key={`${name}${separation}`}>
            {name}, {separation}, {description}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
