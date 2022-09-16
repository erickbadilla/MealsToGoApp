import React, { FunctionComponent, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { AccountNavigation } from "../../../../infrastructure/navigation/account.navigator";
import { AccountBackground } from "../../components/account-background/account-background.styles";
import { AccountContainer } from "../../components/account-container/account-container.styles";
import { AccountCover } from "../../components/account-cover/account-cover.styles";
import { AnimationWrapper } from "../../components/animation-wrapper/animation-wrapper.styles";
import { AuthButton } from "../../components/auth-button/auth-button.styles";
import { Title } from "../../components/title/title.styles";

export const AccountScreen: FunctionComponent = () => {
  const navigation = useNavigation<AccountNavigation>();

  const handleLogin = useCallback(() => {
    navigation.navigate("LoginStack");
  }, [navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate("RegisterStack");
  }, [navigation]);

  return (
    <AccountBackground>
      <AccountCover />

      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../../assets/Animations/watermelon-animation.json")}
        />
      </AnimationWrapper>

      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          onPress={handleLogin}
          mode="contained"
          icon="lock-open-outline"
        >
          Login
        </AuthButton>
        <Spacer size="large" />
        <AuthButton onPress={handleRegister} mode="contained" icon="email">
          Register
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
};
