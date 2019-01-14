import React from 'react';
import { injectGlobal } from 'styled-components';

import Header from 'components/Header';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    width: 100%;
    font-family: sans-serif;
    background-color: #222;
  }
`

const App = () => (
  <Header />
);

export default App;
