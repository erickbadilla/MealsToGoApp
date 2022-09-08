import {
  Client,
  PlaceData,
  PlacesNearbyResponseData,
} from "@googlemaps/google-maps-services-js";
import { Request, Response } from "firebase-functions";
import { MealsToGoResponse } from "../models/response";
import { mocks, addMockImages } from "./mock/index";
import { AxiosError } from "axios";
import { config as functionsConfig } from "firebase-functions";
const url = require("url");

interface IPlaceReponse extends Omit<Partial<PlaceData>, "photos"> {
  photos: string[];
}

const addGoogleImage = (restaurant: Partial<PlaceData>): IPlaceReponse => {
  const photoRef: string | undefined = restaurant.photos?.[0]?.photo_reference;

  const retaurantMutation: IPlaceReponse =
    restaurant as unknown as IPlaceReponse;

  if (!photoRef) {
    retaurantMutation.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];

    return retaurantMutation;
  }

  retaurantMutation.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${
      functionsConfig().google.key
    }`,
  ];

  return retaurantMutation;
};

export const placesRequest = async (
  request: Request,
  response: Response<MealsToGoResponse>,
  client: Client
) => {
  const { location, mock } = url.parse(request.url, true).query;

  if (!location || typeof location !== "string" || !location.length) {
    return response.status(400).json({
      status: "error",
      message: "Please send a valid request.",
    });
  }

  if (mock === "true") {
    const foundLocation: Partial<PlacesNearbyResponseData> = (mocks as any)[
      location
    ];

    if (!foundLocation) {
      return response.status(400).json({
        status: "error",
        message: "Please send a valid request.",
      });
    }

    const results = foundLocation?.results?.map(addMockImages);

    return response.status(200).json({
      status: "success",
      data: results,
    });
  }

  try {
    const {
      data: { results: places },
    } = await client.placesNearby({
      params: {
        location,
        radius: 1500,
        type: "restaurant",
        key: functionsConfig().google.key,
      },
      timeout: 1000,
    });

    const mappedResults = places.map(addGoogleImage);

    return response.status(200).json({
      status: "success",
      data: mappedResults,
    });
  } catch (e: any) {
    if (e instanceof AxiosError) {
      return response.status(400).json({
        status: "error",
        message: e.response?.data?.error_message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
