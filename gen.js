const fs = require('fs');
const axios = require('axios');
const _ = require('lodash');

(async () => {
  const input = fs.readFileSync('plain.txt', 'utf8');
  const lines = input.split('\n');
  const cells = lines.map((line) => line.split(','));
  const data = cells.map(([name, separation, description]) => {
    return { name, separation, description };
  });
  const kanjiNames = _.map(data, 'name');
  const response = await axios.post('https://labs.goo.ne.jp/api/hiragana', {
    app_id: '9603fba3a557a0d69221529d80c9d3f9edff964c214fa501616a84ce0c9e50db',
    sentence: kanjiNames.join(','),
    output_type: 'hiragana',
  });
  const kanaNames = response.data.converted.split(',');
  const fullData = data.map((item, i) => {
    return {
      ...item,
      kana: kanaNames[i],
    };
  });
  fs.writeFileSync('data.json', JSON.stringify(fullData, null, '  '), 'utf8');
})();
