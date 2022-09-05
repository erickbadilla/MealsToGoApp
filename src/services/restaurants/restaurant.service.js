import { mockImages } from "./mock/index";
import camelize from "camelize";
import { HOST } from "../../utils/enviroment";

export const restaurantAPITransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    const { opening_hours, open_now, business_status } = restaurant;

    restaurant.photos = restaurant.photos.map((_photo) => {
      return mockImages[Math.floor(Math.random() * mockImages.length)];
    });

    return {
      ...restaurant,
      isOpenNow: opening_hours && open_now,
      isClosedTemporarily: business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};

// `http://${
//   isAndroid() ? "10.0.2.2" : "localhost"
// }:5001/mealstogo-12157/us-central1/placesNearby?location=${location}`;

export const RestaurantRequest = async (
  location = "37.7749295,-122.4194155"
) => {
  try {
    const response = await fetch(`${HOST}/placesNearby?location=${location}`);

    const { data } = await response.json();

    return data;
  } catch (e) {
    return e;
  }
};
