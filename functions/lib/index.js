"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunds = void 0;
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
// make the request
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.getFunds = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    node_fetch_1.default('https://www.avanza.se/_api/fund-guide/list?shouldCheckFondExcludedFromPromotion=true', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "startIndex": 0, "indexFund": true, "showActivelyManagedFunds": false, "sustainabilityProfile": false, "lowCo2": false, "svanenMark": false, "noFossilFuelInvolvement": false, "commonRegionFilter": [], "otherRegionFilter": [], "alignmentFilter": [], "industryFilter": [], "fundTypeFilter": ["Aktiefond"], "interestTypeFilter": [], "sortField": "totalFee", "sortDirection": "ASCENDING", "name": "", "recommendedHoldingPeriodFilter": [], "companyFilter": [], "productInvolvementsFilter": [], "ratingFilter": [], "sustainabilityRatingFilter": [], "environmentalRatingFilter": [], "socialRatingFilter": [], "governanceRatingFilter": [] })
    })
        .then(res => res.text())
        .then(text => response.send(text));
});
//# sourceMappingURL=index.js.map