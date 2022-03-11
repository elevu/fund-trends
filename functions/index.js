const functions = require("firebase-functions");
const fetch = require("node-fetch");
const Firestore = require("@google-cloud/firestore");
const PROJECTID = "fund-trends";
const COLLECTION_NAME = "funds";
const documentName = "indexes";
const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimp = mailchimpFactory("ewrrwer");

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

exports.getFunds = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  fetch("https://www.avanza.se/_api/fund-guide/list?shouldCheckFondExcludedFromPromotion=true", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
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
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});


exports.updateFunds = functions.https.onRequest((request, response) => {
  firestore.settings({ignoreUndefinedProperties: true});
  const saveData = (funds) => {
    const indexesRef = firestore.collection(COLLECTION_NAME).doc(documentName);
    return indexesRef.update({
      funds: funds,
    })
        .then(() => {
          response.send("Funds updated!");
        })
        .catch((error) => {
          response.send(`Oppsie: ${error}`);
        });
  };
  fetchFunds(0)
      .then((res) => res.json())
      .then((text) => {
        let localFunds = [...text.fundListViews];
        const totalFunds = text.totalNoFunds;
        const callsToMake = Math.floor(totalFunds/text.fundListViews.length);

        if (callsToMake < 1) {
          saveData(text.fundListViews);
        }

        [...Array(callsToMake).keys()].map( (i) => {
          fetchFunds((i+1)*text.fundListViews.length).then((res) => res.json()).then((text)=>{
            localFunds = [...localFunds, ...text.fundListViews];
            if (localFunds.length === totalFunds) {
              console.log(localFunds.length);
              saveData(localFunds);
            }
          });
        });
      }
      );
});


exports.updateEmail = functions.https.onRequest((request, response) => {
sendEmail().then(res=>response.send(res))
});

const fetchFunds = (index) => {
  return fetch("https://www.avanza.se/_api/fund-guide/list?shouldCheckFondExcludedFromPromotion=true", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({"startIndex": index, "indexFund": true, "showActivelyManagedFunds": false, "sustainabilityProfile": false, "lowCo2": false, "svanenMark": false, "noFossilFuelInvolvement": false, "commonRegionFilter": [], "otherRegionFilter": [], "alignmentFilter": [], "industryFilter": [], "fundTypeFilter": ["Aktiefond"], "interestTypeFilter": [], "sortField": "totalFee", "sortDirection": "ASCENDING", "name": "", "recommendedHoldingPeriodFilter": [], "companyFilter": [], "productInvolvementsFilter": [], "ratingFilter": [], "sustainabilityRatingFilter": [], "environmentalRatingFilter": [], "socialRatingFilter": [], "governanceRatingFilter": []}),
  });
};

 async function sendEmail() {
  const response = await mailchimp.users.ping();
  console.log(response);
  return response
}