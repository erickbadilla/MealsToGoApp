import { Request, Response } from "firebase-functions";
import { MealsToGoResponse } from "../models/response";
import { locations as locationsMock } from "./geocode-mock";
const url = require("url");

export const geoCodeRequest = (
  request: Request,
  response: Response<MealsToGoResponse>
) => {
  const { city } = url.parse(request.url, true).query;

  if (!city || typeof city !== "string" || !city.length) {
    response.status(400).json({
      status: "error",
      message: "No city provided as query",
    });
  }
  const result = (locationsMock as any)[city.toLowerCase()];

  if (!result) {
    response.status(404).json({
      status: "error",
      message: "Could not search location",
    });
  }

  response.status(200).json({
    status: "error",
    data: result,
  });
};
