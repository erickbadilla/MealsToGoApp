import camelize from "camelize";

import { HOST, isMock } from "../../utils/enviroment";

export const restaurantAPITransform = (results = []) => {
  const mappedResults = results.map((restaurant) => {
    const { opening_hours, open_now, business_status } = restaurant;

    return {
      ...restaurant,
      isOpenNow: opening_hours && open_now,
      isClosedTemporarily: business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};

export const RestaurantRequest = async (
  location = "37.7749295,-122.4194155"
) => {
  const response = await fetch(
    `${HOST}/placesNearby?location=${location}&mock=${isMock}`
  );

  const { data } = await response.json();

  return data;
};
