import React from 'react';
import ReactDom from 'react-dom';
import {hot} from 'react-hot-loader/root';

import GuGuDan from './src/game/GuGuDan';
import WordRelay from './src/game/WordRelay'
import Baseball from './src/game/Baseball';

const Hot = hot(Baseball);
ReactDom.render(<Hot />, document.querySelector('#root'));