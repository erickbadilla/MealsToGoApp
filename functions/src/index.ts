import * as functions from "firebase-functions";
import { geoCodeRequest } from "../geocode/index";
import { placesRequest } from "../places/index";
import { payRequest } from "../pay/index";

import { Client as GoogleClient } from "@googlemaps/google-maps-services-js";
import { Stripe } from "stripe";

const stripeClient = new Stripe(functions.config().stripe.key, {
  apiVersion: "2022-08-01",
});

const googleClient = new GoogleClient({});

// // Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const geocode = functions.https.onRequest((request, response) => {
  geoCodeRequest(request, response, googleClient);
});

export const placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

export const pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
