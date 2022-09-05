import camelize from "camelize";
import { HOST } from "../../utils/enviroment";

export const locationRequestAPI = async (location) => {
  try {
    console.log(HOST);
    const response = await fetch(`${HOST}/geocode?city=${location}`);

    const { data } = await response.json();

    return data;
  } catch (e) {
    return e;
  }
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
    viewport: geometry.viewport,
  };
};
