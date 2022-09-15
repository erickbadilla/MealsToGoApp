import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRestaurant } from "../models/restaurant";
import { ICartItem } from "./model/cart-context.model";
import uuid from "uuid-random";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { unstable_batchedUpdates } from "react-native";
import { useAuthentication } from "../auth/authentication.context";

interface ICartContext {
  add: (item: ICartItem, restaurant: IRestaurant) => void;
  clear: () => void;

  cart: ICartItem[];
  restaurant: IRestaurant | undefined;
}

interface IStoredCart {
  restaurant: IRestaurant;
  cart: ICartItem[];
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartContextProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [restaurant, setRestaurant] = useState<IRestaurant | undefined>(
    undefined
  );

  const { user } = useAuthentication();

  const saveCart = useCallback(
    async (
      restaurantToSave: IRestaurant,
      cartToSave: ICartItem[],
      userUID: string
    ) => {
      try {
        const cartInfoToSave: IStoredCart = {
          restaurant: restaurantToSave,
          cart: cartToSave,
        };

        const serializedJSON = JSON.stringify(cartInfoToSave);
        await AsyncStorage.setItem(`@cart-${userUID}`, serializedJSON);
      } catch (e) {}
    },
    []
  );

  const loadCart = useCallback(async (userUID: string) => {
    try {
      const serializedJSON = await AsyncStorage.getItem(`@cart-${userUID}`);

      if (!serializedJSON) {
        return;
      }

      const { restaurant: storedRestaurant, cart: storedCart }: IStoredCart =
        JSON.parse(serializedJSON);

      unstable_batchedUpdates(() => {
        setRestaurant(storedRestaurant);
        setCart(storedCart);
      });
    } catch (e) {}
  }, []);

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

  useEffect(() => {
    if (!user || !restaurant) {
      return;
    }

    saveCart(restaurant, cart, user.uid);
  }, [restaurant, cart, user, saveCart]);

  useEffect(() => {
    if (!user) {
      return;
    }

    loadCart(user.uid);
  }, [user, loadCart]);

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
