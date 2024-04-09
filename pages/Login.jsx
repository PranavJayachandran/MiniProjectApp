import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../components/InputField";
import { useState } from "react";
import { BackButton } from "../components/BackButton";
import { setUserId } from "../helpers/helper";
import ErrorToaster from "../components/ErrorToaster";
import Loader from "../components/Loader";


export const Login = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const buttonWidth = width - 60; // 40 pixels on each side
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const handleLogin = async () => {
        setShowLoader(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userName": userName,
            "passWord": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch("http://192.168.99.143:3000/user/login", requestOptions)
        let result = await response.json();
        if (result.id) {
            await setUserId(result.id);
            setShowLoader(false);
            navigation.navigate("Dashboard")
        }
        if (result.err) {
            setShowLoader(false);
            setError(result.err);
        }
    }
    return (
        <SafeAreaView>
            {error.length > 0 ? <ErrorToaster message={error} setError={setError} /> : <></>}
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
            {showLoader ? <Loader message={"Logging In"} />
                : <></>}
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