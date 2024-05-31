import {Image, Pressable, StyleSheet, View} from "react-native";

export function PlaceItem({place, onSelect}) {
    return <Pressable style={[]} onPress={onSelect}>
        <Image source={{uri: place.imageUri}} />
        <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({

})