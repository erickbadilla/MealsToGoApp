import { Request, Response } from "firebase-functions";
import { MealsToGoResponse } from "../models/response";
import { mocks, addMockImages } from "./mock/index";
const url = require("url");

export const placesRequest = (
  request: Request,
  response: Response<MealsToGoResponse>
) => {
  const { location } = url.parse(request.url, true).query;

  if (!location || typeof location !== "string" || !location.length) {
    response.status(400).json({
      status: "error",
      message: "Please send a valid request.",
    });
  }

  const foundLocation = (mocks as any)[location];

  if (!foundLocation) {
    response.status(400).json({
      status: "error",
      message: "Please send a valid request.",
    });
  }

  foundLocation.results = foundLocation.results.map(addMockImages);

  response.status(200).json({
    status: "success",
    data: foundLocation,
  });
};
