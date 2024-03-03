import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../components/InputField";
import { useState } from "react";
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#649468',
        opacity: 0.55,
    }
});

export default styles;

export const SignUp = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const buttonWidth = width - 60; // 40 pixels on each side
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View className="h-screen w-screen bg-opacity-10" style={styles.container}>
                    </View>
                    <View className="absolute bg-white px-10 py-10 rounded-xl top-72 left-16 flex gap-2 items-center">
                        <View className=" h-10 w-10 bg-opacity-100 bg-[#649468] flex justify-center items-center rounded-full" style={styles.tick}>
                            <Image source={require("../assets/images/tick.png")} />
                        </View>
                        <Text className="text-xl font-bold">Account Created !</Text>
                    </View>

                </Modal>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/images/backarrow.png")}
                    />
                </TouchableOpacity>
            </View>
            <View className="mt-10 px-10">
                <Text className="text-4xl font-bold">
                    Let's get started!
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
                    onPress={() => {
                        setModalVisible(!modalVisible);
                        setTimeout(function () {
                            setModalVisible((prev) => !prev);
                        }, 3000)
                    }}>
                    <Text className="text-center py-3">SignUp</Text>
                </TouchableOpacity>
                <View className="flex flex-row justify-center mt-3 "><Text>
                    Already have an account?
                </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text className="font-bold">Login</Text>
                    </TouchableOpacity></View>

            </View>
        </SafeAreaView>
    )

}