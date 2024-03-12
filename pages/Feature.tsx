import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../components/InputField";
import { useState } from "react";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list";
import { ProgressBar } from "../components/ProgressBar";
import { Layout } from "../components/Layout";
import { ScrollView } from "react-native-gesture-handler";
import { getUserId } from "../helpers/helper";

export const Feature = ({ navigation }) => {
    const [soilType, setSoilType] = useState("");
    const [region, setRegions] = useState("");
    const [crops, setCrops] = useState("");
    const [showLayout, setShowLayout] = useState(false);
    const [grid, setGrid] = useState(Array(6).fill(Array(7).fill(false)));
    const soilTypes = [
        { key: '1', value: 'Dry' },
        { key: '2', value: 'Humid' },
        { key: '3', value: 'Wet' },
    ]
    const regionTypes = [
        { key: '1', value: 'Desert' },
        { key: '2', value: 'Semi Arid' },
        { key: '3', value: 'Semi Humid' },
        { key: '4', value: 'Humid' },
    ]
    const cropTypes = [
        { key: '1', value: 'Cabbage' },
        { key: '2', value: 'Melon' },
        { key: '3', value: 'Bean' },
        { key: '4', value: 'Tomato' },
        { key: '5', value: 'Onion' },
    ]
    const handleContinue = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let layout = [];
        grid.map((row) => {
            let p = -1;
            row.map((item, index) => {
                if (item == 1)
                    p = index + 1;
            })
            if (p != -1)
                layout.push(p);
        })
        const raw = JSON.stringify({
            "userId": await getUserId(),
            "soilType": soilType,
            "region": region,
            "cropTypes": crops,
            "layout": layout,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch("http://192.168.99.143:3000/farm/set", requestOptions)
        navigation.navigate("FarmLayout")
    }
    return (
        <SafeAreaView>
            <ProgressBar navigation={navigation} progress={1} />
            {/* Height here is put as a number should be changed eventually  */}
            <ScrollView className="h-[700px] ">
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
                            boxStyles={{ display: 'flex' }}
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
                    <TouchableOpacity className="bg-[#649468] rounded-xl mt-4" onPress={handleContinue}>
                        <Text className="text-center py-3 font-bold text-[15px]">Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}