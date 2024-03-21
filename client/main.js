import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HelloWorld from './HelloWorld';
import Home from './Home';
import Nav from './Nav';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path='/' element={<HelloWorld />} />
      <Route path='/home' element={<Home />} />
      <Route path='/nav' element={<Nav />} />
    </Routes>
  </Router>
);

