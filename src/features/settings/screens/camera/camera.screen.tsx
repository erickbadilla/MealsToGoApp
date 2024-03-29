import React, { useCallback, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";

import { Text } from "../../../../components/typography/text.component";
import { useAuthentication } from "../../../../services/auth/authentication.context";

import { CenterText, InnerSnap, ProfileCamera } from "./camera.styles";

export const CameraScreen = () => {
  const [permission, requestPermission] = ProfileCamera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const { user } = useAuthentication();
  const navigation = useNavigation();

  const snap = useCallback(async () => {
    if (!cameraRef?.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync();

    AsyncStorage.setItem(`${user?.uid}-photo`, photo.uri);

    navigation.goBack();
  }, [user, navigation]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission?.granted) {
    return (
      <CenterText>
        <Text>No permission to access the camera</Text>
      </CenterText>
    );
  }

  return (
    <ProfileCamera
      type={CameraType.front}
      ref={cameraRef}
      ratio="16:9"
      useCamera2Api={true}
    >
      <TouchableOpacity onPress={snap}>
        <InnerSnap />
      </TouchableOpacity>
    </ProfileCamera>
  );
};
