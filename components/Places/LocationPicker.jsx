import {Alert, Image, StyleSheet, View, Text} from "react-native";
import {OutlinedButton} from "../ui/OutlinedButton";
import {Colors} from "../../constants/colors";
import {getCurrentPositionAsync, useForegroundPermissions} from "expo-location"
import {useEffect, useState} from "react";
import {useNavigation, useRoute, useIsFocused} from "@react-navigation/native";

export function LocationPicker() {
    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [pickedLocation, setPickedLocation] = useState(null)

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params && {
                lat: route.params.pickedLocation.lat,
                lng: route.params.pickedLocation.lng
            }
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused]);

    async function verifyPermission() {
        const granted = locationPermissionInformation.granted
        if (!granted && locationPermissionInformation.canAskAgain) {
            const res = await requestPermission()
            return res.granted
        }
        if (!granted) {
            Alert.alert("Insufficient Permissions!", "You need to grant location permission to use this app.")
            return false
        }
        return true
    }

    async function getLocationHandler() {
        const granted = await verifyPermission()
        if (!granted) return

        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }
    function pickOnMapHandler() {
        navigation.navigate("Map")
    }

    let locationPreview = <Text>No location picked yet.</Text>
    if (pickedLocation) locationPreview =  <Text>Map image with latitude: {pickedLocation.lat} and longitude: {pickedLocation.lng}</Text>

    return <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%"
    }
})