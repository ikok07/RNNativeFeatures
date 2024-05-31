import {useState} from "react"
import {View, Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {Colors} from "../../constants/colors";
import {ImagePicker} from "./ImagePicker";
import {LocationPicker} from "./LocationPicker";
import {PrimaryButton} from "../ui/PrimaryButton";

export function PlaceForm() {
    const [title, setTitle] = useState()

    function savePlaceHandler() {

    }

    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
        </View>
        <ImagePicker />
        <LocationPicker />
        <PrimaryButton onPress={savePlaceHandler} style={styles.saveButton}>Add Place</PrimaryButton>
    </ScrollView>
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
    saveButton: {
        marginTop: 24
    }
})