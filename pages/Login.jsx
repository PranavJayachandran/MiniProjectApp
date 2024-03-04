import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../components/InputField";
import { useState } from "react";
import { BackButton } from "../components/BackButton";

export const Login = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const buttonWidth = width - 60; // 40 pixels on each side

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        navigation.navigate("FeatureSelect")
    }
    return (
        <SafeAreaView>
            <BackButton navigation={navigation} />

            <View className="mt-10 px-10">
                <Text className="text-4xl font-bold">
                    Welcome Back!
                </Text>
                <Text className="text-[#8C8F8C]">
                    Automation at your finger tips
                </Text>
            </View>

            <View className="mt-14">
                <InputField title="Username" inputdata={userName} setData={setUserName} />
                <InputField title="Password" inputdata={password} setData={setPassword} />
            </View>
            <View className="mx-10 mt-20">
                <TouchableOpacity className="bg-[#649468] rounded-xl " style={{ width: buttonWidth }}
                    onPress={() => handleLogin()}>
                    <Text className="text-center py-3">Login</Text>
                </TouchableOpacity>
                <View className="flex flex-row justify-center mt-3 "><Text>
                    Don't have an account?

                </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                        <Text className="font-bold"> Sign Up</Text>
                    </TouchableOpacity></View>

            </View>
        </SafeAreaView>
    )

}