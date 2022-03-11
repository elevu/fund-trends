const functions = require("firebase-functions");
const fetch = require("node-fetch");
const Firestore = require("@google-cloud/firestore");
const PROJECTID = "fund-trends";
const COLLECTION_NAME = "funds";
const documentName = "indexes";


const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

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

exports.getDBFunds = functions.https.onRequest((request, response) => {
  const docRef = firestore.collection(COLLECTION_NAME).doc(documentName);
  response.set("Access-Control-Allow-Origin", "*");
  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      response.send(doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});

exports.updateFunds = functions.https.onRequest((request, response) => {
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
      .then((res) => res.json())
      .then((text) => {
        // eslint-disable-next-line max-len
        const indexesRef = firestore.collection(COLLECTION_NAME).doc(documentName);
        console.log(text);
        return indexesRef.update({
          funds: text.fundListViews,
        })
            .then(() => {
              response.send("Funds updated!");
            })
            .catch((error) => {
              // The document probably doesn't exist.
              response.send("Something went wrong");
            });
      }
      );
});
