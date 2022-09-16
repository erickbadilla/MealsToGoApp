import React, { FunctionComponent, useCallback, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { AccountNavigation } from "../../../../infrastructure/navigation/account.navigator";
import { useAuthentication } from "../../../../services/auth/authentication.context";
import { AccountBackground } from "../../components/account-background/account-background.styles";
import { AccountContainer } from "../../components/account-container/account-container.styles";
import { AccountCover } from "../../components/account-cover/account-cover.styles";
import { AuthButton } from "../../components/auth-button/auth-button.styles";
import { AuthInput } from "../../components/auth-Input/auth-input.styles";
import { ErrorContainer } from "../../components/error-container/error-container.styles";
import { Title } from "../../components/title/title.styles";

export const RegisterScreen: FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");

  const navigation = useNavigation<AccountNavigation>();
  const { error, onRegister, isLoading } = useAuthentication();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Login</Title>
      <AccountContainer>
        <AuthInput
          label="Email"
          placeholder="E-mail"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />

        <Spacer size="large">
          <AuthInput
            label="Password"
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </Spacer>

        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            placeholder="Repeat Password"
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChange={(e) => setRepeatedPassword(e.nativeEvent.text)}
          />
        </Spacer>

        {error && (
          <ErrorContainer>
            <Text variant="error">{error.message}</Text>
          </ErrorContainer>
        )}

        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => {
                onRegister(email, password, repeatedPassword);
              }}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>

      <Spacer size="large">
        <AuthButton mode="contained" onPress={handleBack}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
