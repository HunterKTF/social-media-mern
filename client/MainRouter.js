import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './core/Home';
import Menu from './core/Menu';

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
