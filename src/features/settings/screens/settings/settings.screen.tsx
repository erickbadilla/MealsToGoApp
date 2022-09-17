import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { User } from "firebase/auth/react-native";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { SettingsNavigation } from "../../../../infrastructure/navigation/settings.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { useAuthentication } from "../../../../services/auth/authentication.context";

import {
  AvatarContainer,
  AvatarIcon,
  SettingsBackground,
  SettingsItem,
  TransparentSafeArea,
} from "./settings.styles";

const withSpacer =
  <P extends object>(
    Component: React.ComponentType<P>
  ): FunctionComponent<P & React.ComponentProps<typeof Spacer>> =>
  ({ position, size, ...props }) =>
    (
      <Fragment>
        <Component {...(props as P)} />
        <Spacer position={position} size={size} />
      </Fragment>
    );

const SettingItemWithSpacer = withSpacer(SettingsItem);

export const SettingsScreen = () => {
  const [userPhoto, setUserPhoto] = useState<string>("");

  const { onLogout, user } = useAuthentication();
  const navigation = useNavigation<SettingsNavigation>();

  const getProfilePicture = useCallback(async (currentUser: User) => {
    const photoURI = await AsyncStorage.getItem(`${currentUser.uid}-photo`);

    if (!photoURI) {
      return;
    }
    setUserPhoto(photoURI);
  }, []);

  useFocusEffect(() => {
    if (!user) {
      return;
    }

    getProfilePicture(user);
  });

  const FavouritesItem = useCallback(
    (props) => <List.Icon {...props} color={colors.ui.error} icon="heart" />,
    []
  );

  const LogoutItem = useCallback(
    (props) => <List.Icon {...props} color={colors.ui.secondary} icon="door" />,
    []
  );

  const PaymentItem = useCallback(
    (props) => <List.Icon {...props} color={colors.ui.secondary} icon="cart" />,
    []
  );

  const PastOrdersItem = useCallback(
    (props) => (
      <List.Icon {...props} color={colors.ui.secondary} icon="history" />
    ),
    []
  );

  const handleAvatarPress = useCallback(() => {
    navigation.navigate("Camera");
  }, [navigation]);

  return (
    <Fragment>
      <SettingsBackground />
      <TransparentSafeArea>
        <AvatarContainer>
          <TouchableOpacity onPress={handleAvatarPress}>
            {userPhoto ? (
              <Avatar.Image size={180} source={{ uri: userPhoto }} />
            ) : (
              <AvatarIcon size={180} icon="human" />
            )}
          </TouchableOpacity>
          <Spacer position="top" size="large">
            <Text variant="label">{user?.email}</Text>
          </Spacer>
        </AvatarContainer>

        <Spacer>
          <List.Section>
            <SettingItemWithSpacer
              title="Favourites"
              description="View your favourites"
              left={FavouritesItem}
              onPress={() => {
                navigation.navigate("Favourites");
              }}
            />

            <SettingItemWithSpacer
              title="Payment"
              left={PaymentItem}
              onPress={() => null}
            />

            <SettingItemWithSpacer
              title="Past Orders"
              left={PastOrdersItem}
              onPress={() => null}
            />

            <SettingItemWithSpacer
              title="Logout"
              left={LogoutItem}
              onPress={onLogout}
            />
          </List.Section>
        </Spacer>
      </TransparentSafeArea>
    </Fragment>
  );
};
