import * as functions from "firebase-functions";
import { geoCodeRequest } from "../geocode/index";
import { placesRequest } from "../places/index";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const geocode = functions.https.onRequest((request, response) => {
  geoCodeRequest(request, response);
});

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!!");
});

export const placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
});
