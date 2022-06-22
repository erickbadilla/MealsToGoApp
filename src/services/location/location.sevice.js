import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequestAPI = (location) => {
  return new Promise((resolve, reject) => {
    const result = locations[location.toLowerCase()];

    if (!result) {
      reject(new Error("No result found"));
    }

    resolve(result);
  });
};

export const locationAPITransform = (apiResult) => {
  const {
    results: [firstResult],
  } = camelize(apiResult);

  const { geometry = {} } = firstResult;
  const { lat, lng } = geometry.location;

  return {
    lat,
    lng,
  };
};
