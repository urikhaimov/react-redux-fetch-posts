import React from 'react';
import  Posts  from './features/posts/Posts';
import './App.css';

import { SelectLanguage } from './features/selectLanguage/SelectLanguage';

function App() {
 
  return (
    <div className="App">
      <SelectLanguage></SelectLanguage>
       <Posts></Posts>
    </div>
  );
}

export default App;
