import React, { useState, useEffect } from 'react';
import ImageList from './ImageList'
import Header from './Header'

function App() {

const [yesCount, setYesCount] = useState(0)
const [totalCount, setTotalCount] = useState(0)

const plusYesCount = () => {
  setYesCount(prevCount => prevCount + 1)
  addTotalCount()
}
const addTotalCount = () => {
  setTotalCount(prevCount => prevCount + 1)
}
useEffect(() => {
  document.title = 'Poké or Pass';
}, []);

  return (
    <div class="bg-emerald-50">
      <Header />
      <p class="m-2 text-center text-4xl font-bold text-gray-900 dark:text-gray">{totalCount}/151</p>
      <ImageList onYes ={plusYesCount} yesCount ={yesCount} onNo = {addTotalCount}/>
      
    </div>
  );
}

export default App;
