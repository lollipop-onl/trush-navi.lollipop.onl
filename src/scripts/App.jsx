import React, { useState } from 'react';
import data from '../assets/data.json';

const App = () => {
  const [input, setInput] = useState('');

  const filteredData = data.filter(({ name }) => name).filter(({ name, kana }) => {
    if (!input) {
      return true;
    }

    return input.split(' ').every((chunk) => {
      return name.toLocaleString().includes(chunk) || kana.toLocaleString().includes(chunk);
    });
  });

  const onInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="page-container">
      <h1 className="title">ゴミ分別ナビ for CHIBA</h1>
      <p className="description">
        千葉市のゴミ分別カタログです。
        <a
          href="https://www.city.chiba.jp/kankyo/junkan/shushugyomu/gomibunbetujiten.html"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >データの出典元</a>
      </p>
      <div className="field">
        <input className="input" placeholder="Keyword..." type="search" onInput={onInput}/>
        <div className="count">{filteredData.length}件</div>
      </div>
      <ul className="list">
        {filteredData.map(({ name, separation, description}) => (
          <li className="data-catalog item" key={`${name}${separation}`}>
            <div className="name">{name}</div>
            <div className="separation">{separation}</div>
            {description ? (
              <div className="description">{description}</div>
            ) : null}
          </li>
        ))}
      </ul>
      <a
        href="https://www.lollipop.onl"
        target="_blank"
        rel="noopener noreferrer"
        className="footer"
      >
        Powered by lollipop.onl
      </a>
    </div>
  );
};

export default App;
