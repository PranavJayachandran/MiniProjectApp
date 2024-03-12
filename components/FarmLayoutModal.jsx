import { Text, TouchableOpacity, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import InputField from "./InputField";
export const FarmLayoutModal = ({ cropTypes, setModalVisible, sprinklerName, setSprinklerName, setCropType }) => {
    return (
        <View className="h-screen w-screen flex justify-center items-center">
            <View className="border rounded-xl w-72 py-4 flex justify-center bg-white">
                <View className="px-10">
                    <Text className="mb-1">
                        Crop Type
                    </Text>
                    <SelectList
                        setSelected={(val) => setCropType(val)}
                        data={cropTypes}
                        save="value"
                        placeholder="Select Crop Type"
                        searchPlaceholder="Search Crop"
                    />
                </View>
                <InputField title="SprinklerName" inputdata={sprinklerName} setData={setSprinklerName} />
                <TouchableOpacity className="mt-4 bg-[#649468] rounded-xl mx-10" onPress={() => setModalVisible((prev) => !prev)}>
                    <Text className="text-center py-3 text-white">Add</Text>
                </TouchableOpacity>
            </View >
        </View>
    )
}
