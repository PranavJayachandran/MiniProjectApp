import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../components/InputField";
import { useState } from "react";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list";
import { ProgressBar } from "../components/ProgressBar";
import { Layout } from "../components/Layout";

export const Feature = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const [soilType, setSoilType] = useState("");
    const [region, setRegions] = useState("");
    const [crops, setCrops] = useState("");
    const [showLayout, setShowLayout] = useState(false);
    const [grid, setGrid] = useState(Array(6).fill(Array(7).fill(false)));
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const soilTypes = [
        { key: '1', value: 'one' },
        { key: '2', value: 'two' },
        { key: '3', value: 'three' },
        { key: '4', value: 'four' },
    ]
    const regionTypes = [
        { key: '1', value: 'one' },
        { key: '2', value: 'two' },
        { key: '3', value: 'three' },
        { key: '4', value: 'four' },
    ]
    const cropTypes = [
        { key: '1', value: 'one' },
        { key: '2', value: 'two' },
        { key: '3', value: 'three' },
        { key: '4', value: 'four' },
    ]
    return (
        <SafeAreaView>
            <ProgressBar navigation={navigation} progress={1} />
            <View className="px-10 mt-10">
                <Text className="text-3xl font-bold">Select Features!</Text>
            </View>
            <View className="px-10 mt-10">
                <View>
                    <Text className="mb-1 px-2">Soil Type</Text>
                    <SelectList
                        setSelected={(val) => setSoilType(val)}
                        data={soilTypes}
                        save="value"
                        placeholder="Select Soil Type"
                        searchPlaceholder="Search Soil Type"
                    />
                </View>
                <View className="mt-4">
                    <Text className="mb-1 px-2">Region</Text>
                    <SelectList
                        setSelected={(val) => setRegions(val)}
                        data={regionTypes}
                        save="value"
                        placeholder="Select Region"
                        searchPlaceholder="Search Region"
                    />
                </View>
                <View className="mt-4">
                    <Text className="mb-1 px-2">CropTypes</Text>
                    <MultipleSelectList
                        setSelected={(val) => setCrops(val)}
                        data={cropTypes}
                        save="value"
                        placeholder="Select Crops"
                        searchPlaceholder="Search Crop"
                    />
                </View>
                {!showLayout ?
                    <View className="mt-4">
                        <TouchableOpacity className="border-2 border-[#649468]  rounded-xl " onPress={() => setShowLayout(true)}>
                            <Text className="text-[15px] text-center py-3 text-[#649468] font-semibold">Insert Farm Layout</Text>
                        </TouchableOpacity>
                    </View>
                    : <Layout grid={grid} setGrid={setGrid} />
                }
                <TouchableOpacity className="bg-[#649468] rounded-xl mt-4"  >
                    <Text className="text-center py-3 font-bold text-[15px]">Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}