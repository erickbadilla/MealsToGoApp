import camelize from "camelize";

import { HOST, isMock } from "../../utils/enviroment";

export const locationRequestAPI = async (location) => {
  const response = await fetch(
    `${HOST}/geocode?city=${location}&mock=${isMock}`
  );

  const { data } = await response.json();

  return data;
};

export const locationAPITransform = ([firstResult] = []) => {
  const camelizeFirstResult = camelize(firstResult);

  const { geometry = {} } = camelizeFirstResult;
  const { lat, lng } = geometry.location;

  return {
    lat,
    lng,
    viewport: geometry.viewport,
  };
};
