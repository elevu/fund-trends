import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
const axios = require('axios').default;

function App() {

useEffect(()=>{
  axios.post('https://www.avanza.se/_api/fund-guide/list?shouldCheckFondExcludedFromPromotion=true', {"startIndex":0,"indexFund":true,"showActivelyManagedFunds":false,"sustainabilityProfile":false,"lowCo2":false,"svanenMark":false,"noFossilFuelInvolvement":false,"commonRegionFilter":[],"otherRegionFilter":[],"alignmentFilter":[],"industryFilter":[],"fundTypeFilter":["Aktiefond"],"interestTypeFilter":[],"sortField":"totalFee","sortDirection":"ASCENDING","name":"","recommendedHoldingPeriodFilter":[],"companyFilter":[],"productInvolvementsFilter":[],"ratingFilter":[],"sustainabilityRatingFilter":[],"environmentalRatingFilter":[],"socialRatingFilter":[],"governanceRatingFilter":[]})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });})
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
