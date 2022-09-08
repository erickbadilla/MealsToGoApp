import { Request, Response } from "firebase-functions";
import { MealsToGoResponse } from "../models/response";
import { locations as locationsMock } from "./geocode-mock";
import { Client } from "@googlemaps/google-maps-services-js";
import { AxiosError } from "axios";
import { config as functionsConfig } from "firebase-functions";
const url = require("url");

export const geoCodeRequest = async (
  request: Request,
  response: Response<MealsToGoResponse>,
  client: Client
) => {
  const { city, mock } = url.parse(request.url, true).query;

  if (!city || typeof city !== "string" || !city.length) {
    return response.status(400).json({
      status: "error",
      message: "No city provided as query",
    });
  }

  if (mock === "true") {
    const result = (locationsMock as any)[city.toLowerCase()];

    if (!result) {
      return response.status(404).json({
        status: "error",
        message: "Could not search location",
      });
    }

    return response.status(200).json({
      status: "success",
      data: result.results,
    });
  }

  try {
    const geoCodeResponse = await client.geocode({
      params: {
        address: city,
        key: functionsConfig().google.key,
      },
      timeout: 1000,
    });

    return response.status(200).json({
      status: "success",
      data: geoCodeResponse.data.results,
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
