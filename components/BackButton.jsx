import { Image, TouchableOpacity, View } from "react-native"

export const BackButton = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require("../assets/images/backarrow.png")}
                />
            </TouchableOpacity>
        </View>
    )
}