import * as functions from "firebase-functions";
import fetch from "node-fetch";
// make the request

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    fetch('https://www.avanza.se/_api/fund-guide/list?shouldCheckFondExcludedFromPromotion=true', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({"startIndex":0,"indexFund":true,"showActivelyManagedFunds":false,"sustainabilityProfile":false,"lowCo2":false,"svanenMark":false,"noFossilFuelInvolvement":false,"commonRegionFilter":[],"otherRegionFilter":[],"alignmentFilter":[],"industryFilter":[],"fundTypeFilter":["Aktiefond"],"interestTypeFilter":[],"sortField":"totalFee","sortDirection":"ASCENDING","name":"","recommendedHoldingPeriodFilter":[],"companyFilter":[],"productInvolvementsFilter":[],"ratingFilter":[],"sustainabilityRatingFilter":[],"environmentalRatingFilter":[],"socialRatingFilter":[],"governanceRatingFilter":[]})
})
    .then(res => res.text())
    .then(text => console.log(text));
});
