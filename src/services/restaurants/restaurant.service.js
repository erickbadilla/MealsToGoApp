import { mocks, mockImages } from "./mock/index";
import camelize from "camelize";

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

export const RestaurantRequest = (location = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const result = mocks[location];

    if (!result) {
      reject(new Error("No result found"));
    }

    resolve(result);
  });
};
