import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react"

export const Home = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const [text, setText] = useState("this")
    const buttonWidth = width - 60;

    return (
        <SafeAreaView>
            <View className="bg-[#649468] h-screen flex justify-center items-center">
                <Image source={require("../assets/images/Stateoff.png")} />
                <Text className="mt-8 mb-2 text-white text-3xl">Aquasense {text}</Text>
                <Text className="text-white font-bold">Automation at your finger tips</Text>
                <View className="flex gap-4 absolute bottom-20">
                    <TouchableOpacity className="border rounded-lg border-white" style={{ width: buttonWidth }} onPress={() => navigation.navigate("Login")}>
                        <Text className="text-center py-3 text-white">Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border rounded-lg border-white bg-white" style={{ width: buttonWidth }} onPress={() => navigation.navigate("SignUp")}>
                        <Text className="text-center py-3 ">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
)
}