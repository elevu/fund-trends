const functions = require("firebase-functions");
const fetch = require("node-fetch");

// eslint-disable-next-line no-unused-vars
exports.getFunds = functions.https.onRequest((request, response) => {
  console.log(request);
  response.set("Access-Control-Allow-Origin", "*");
  fetch("https://www.avanza.se/_api/fund-guide/list?shouldCheckFondExcludedFromPromotion=true", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    // eslint-disable-next-line max-len
    body: JSON.stringify({"startIndex": request.query.index, "indexFund": true, "showActivelyManagedFunds": false, "sustainabilityProfile": false, "lowCo2": false, "svanenMark": false, "noFossilFuelInvolvement": false, "commonRegionFilter": [], "otherRegionFilter": [], "alignmentFilter": [], "industryFilter": [], "fundTypeFilter": ["Aktiefond"], "interestTypeFilter": [], "sortField": "totalFee", "sortDirection": "ASCENDING", "name": "", "recommendedHoldingPeriodFilter": [], "companyFilter": [], "productInvolvementsFilter": [], "ratingFilter": [], "sustainabilityRatingFilter": [], "environmentalRatingFilter": [], "socialRatingFilter": [], "governanceRatingFilter": []}),
  })
      .then((res) => res.text())
      .then((text) => response.send(text)
      );
});
