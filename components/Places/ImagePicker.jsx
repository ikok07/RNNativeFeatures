import {Alert, Button, Image, View, Text, StyleSheet} from "react-native";
import {launchCameraAsync, useCameraPermissions} from "expo-image-picker"
import {useState} from "react";
import {Colors} from "../../constants/colors";
import {OutlinedButton} from "../ui/OutlinedButton";

export function ImagePicker() {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [selectedImage, setSelectedImage] = useState(null)

    async function verifyPermissions() {
        const granted = cameraPermissionInformation.granted
        if (!granted && cameraPermissionInformation.canAskAgain) {
            const res = await requestPermission()
            return res.granted
        }
        if (!granted) {
            Alert.alert("Insufficient Permissions!", "You need to grant camera permission to use this app.")
            return false
        }
        return true
    }

    async function takePhoto() {
        const granted = await verifyPermissions()
        if (!granted) return

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })
        setSelectedImage(image.assets[0].uri)
    }

    let imagePreview = <Text>No image taken yet.</Text>
    if (selectedImage) {
       imagePreview =  <Image source={{uri: selectedImage}} style={styles.image}/>
    }

    return <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutlinedButton icon="camera" onPress={takePhoto}>Take photo</OutlinedButton>
    </View>
}

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 4

    }
})