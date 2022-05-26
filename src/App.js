import React, { useEffect, useRef, useState } from 'react';
import Contents from './Components/Contents';
import Header from './Components/Header';

const App = () => {
  
  const [words, setWords] = useState(['hello', 'lower', 'apple'])
  let randomIndex =Math.floor(Math.random()*words.length)
  const [check, setCheck] = useState(false)
  
  if(check === true){
    randomIndex = Math.floor(Math.random()*words.length)
  }
  return (
    <div>
      <Header/>
      <Contents words={words} randomIndex={randomIndex} setCheck={setCheck} check={check}
      />
    </div>
  );
};

export default App;
