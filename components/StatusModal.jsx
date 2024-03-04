import { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import InputField from "./InputField";
import { FontAwesome } from '@expo/vector-icons';
export const StatusModal = ({ setModalVisible, modalData, changeSprinklerState }) => {
    const [isEnabled, setIsEnabled] = useState(modalData.sprinklerState);


    const toggleSwitch = () => { setIsEnabled(previousState => !previousState) };
    return (
        <View className="h-screen w-screen flex justify-center items-center">
            <View className="border rounded-xl w-72 py-4 flex justify-center bg-white">
                <View className="flex  items-end px-4 -mt-2">
                    <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                        <FontAwesome name="close" size={24} color="black" />
                    </TouchableOpacity>

                </View>

                <View className="px-10">
                    <Text className="mb-4 ">
                        Crop Type : <Text className="text-lg">
                            {modalData.cropType}
                        </Text>
                    </Text>
                    <Text className="mb-4 ">
                        SprinklerName : <Text className="text-lg">
                            {modalData.sprinklerName}
                        </Text>
                    </Text>
                    <View className="flex flex-row items-center">
                        <Text>
                            Sprinkler On/Off :
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#649468' }}
                            thumbColor={isEnabled ? '#E3F6E5' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View>
                        <TouchableOpacity className="bg-[#649468] rounded-xl " onPress={() => { if (isEnabled != modalData.sprinklerState) changeSprinklerState(isEnabled); setModalVisible(false) }}>
                            <Text className="text-center text-white py-3">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </View>
    )
}
