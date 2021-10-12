import React from 'react';
import  PostsList  from './components/PostsList';
import './App.css';

import { SelectLanguage } from './features/selectLanguage/SelectLanguage';

function App() {
 
  return (
    <div className="App">
      <SelectLanguage></SelectLanguage>
       <PostsList></PostsList>
    </div>
  );
}

export default App;
