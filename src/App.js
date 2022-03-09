import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
const axios = require('axios').default;

function App() {

  const [funds, setFunds] = useState()

useEffect(()=>{
  axios.get('http://localhost:5001/fund-trends/us-central1/getFunds')
  .then(function (response) {
    setFunds(response.data.fundListViews)
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });},[])
  return (
    <div className="App">
      {funds && funds.map(fund=>fund.name)}
    </div>
  );
}

export default App;
