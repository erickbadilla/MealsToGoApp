import React, { FunctionComponent, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

interface IFadeInViewProps {
  duration?: number;
  style?: ViewStyle;
}

export const FadeInView: FunctionComponent<IFadeInViewProps> = ({
  duration = 1500,
  style,
  children,
}) => {
  const fadeAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, duration]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnimation }}>
      {children}
    </Animated.View>
  );
};
