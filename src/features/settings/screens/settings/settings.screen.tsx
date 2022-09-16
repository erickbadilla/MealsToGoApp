import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { User } from "firebase/auth/react-native";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { SettingsNavigation } from "../../../../infrastructure/navigation/settings.navigator";
import { useAuthentication } from "../../../../services/auth/authentication.context";

import { AvatarContainer, AvatarIcon, SettingsItem } from "./settings.styles";
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

  const LogoutItem = useCallback(
    (props) => <List.Icon {...props} color="black" icon="door" />,
    []
  );

  const FavouritesItem = useCallback(
    (props) => <List.Icon {...props} color="black" icon="heart" />,
    []
  );

  const handleAvatarPress = useCallback(() => {
    navigation.navigate("Camera");
  }, [navigation]);

  return (
    <SafeArea>
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
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={FavouritesItem}
          onPress={() => {
            navigation.navigate("Favourites");
          }}
        />
        <SettingsItem title="Logout" left={LogoutItem} onPress={onLogout} />
      </List.Section>
    </SafeArea>
  );
};
