import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from "react";
import { IRestaurant } from "../models/restaurant";
import { ICartItem } from "./model/cart-context.model";
import uuid from "uuid-random";

interface ICartContext {
  add: (item: ICartItem, restaurant: IRestaurant) => void;
  clear: () => void;

  cart: ICartItem[];
  restaurant: IRestaurant | undefined;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartContextProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [restaurant, setRestaurant] = useState<IRestaurant | undefined>(
    undefined
  );

  const add = useCallback<ICartContext["add"]>(
    (item, restaurantToAdd) => {
      const itemToAdd = { ...item, id: uuid() };

      if (!restaurant || restaurant.placeId !== restaurantToAdd.placeId) {
        setRestaurant(restaurantToAdd);
        setCart([itemToAdd]);
        return;
      }

      setCart((currentCart) => [...currentCart, itemToAdd]);
    },
    [restaurant]
  );

  const clear = useCallback<ICartContext["clear"]>(() => {
    setCart([]);
    setRestaurant(undefined);
  }, []);

  return (
    <CartContext.Provider
      value={{
        add,
        clear,
        restaurant,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
