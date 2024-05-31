import {Pressable, StyleSheet, Text} from "react-native";
import {Colors} from "../../constants/colors";

export function PrimaryButton({onPress, children, style}) {
    return <Pressable onPress={onPress} style={({pressed}) => [styles.buttonContainer, style, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius: 4
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.primary50
    },
    pressed: {
        opacity: 0.7
    }
})