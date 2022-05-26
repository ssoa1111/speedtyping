import React, { useEffect, useRef, useState } from 'react';
import Contents from './Components/Contents';
import Header from './Components/Header';

const App = () => {
  
  const [words, setWords] = useState('hello')

  return (
    <div>
      <Header/>
      <Contents words={words} 
      />
    </div>
  );
};

export default App;
