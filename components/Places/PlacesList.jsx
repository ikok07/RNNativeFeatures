import {FlatList, StyleSheet, Text, View} from "react-native";
import {PlaceItem} from "./PlaceItem";
import {Colors} from "../../constants/colors";

export function PlacesList({items}) {
    if (items.length === 0) return <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
    </View>

    return <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
            return <PlaceItem place={item} />
        }}
    />
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center"
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})