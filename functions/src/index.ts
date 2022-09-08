import * as functions from "firebase-functions";
import { geoCodeRequest } from "../geocode/index";
import { placesRequest } from "../places/index";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

// // Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const geocode = functions.https.onRequest((request, response) => {
  geoCodeRequest(request, response, client);
});

export const placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, client);
});
