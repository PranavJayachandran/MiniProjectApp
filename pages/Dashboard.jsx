import { Alert, Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BackButton } from "../components/BackButton"
import { useEffect, useState } from "react";
import { getLayout, getNumberofSprinklerOn, getSprinklerData, updateSprinklerMode } from "../helpers/helper";
import { StatusModal } from "../components/StatusModal";
import CircularProgress from 'react-native-circular-progress-indicator';

const Dashboard = ({ navigation }) => {
    const [layout, setLayout] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [selectedId, setSelectedId] = useState("");
    const [numberofSprinklersOn, setNumberofSprinklersOn] = useState(0);
    let p = 'w-10';
    let size = 0;
    const setUpLayout = async () => {
        let temp = await getLayout();
        setNumberofSprinklersOn(await getNumberofSprinklerOn());
        size = temp.size;
        setLayout(temp.layout);
        if (size == 1)
            p = 'w-28'
        else if (size == 2)
            p = 'w-24'
        else if (size == 3)
            p = 'w-20'
        else if (size == 4)
            p = 'w-16'
        else if (size == 5)
            p = 'w-14'
        else if (size == 6)
            p = 'w-12'
        else if (size == 7)
            p = 'w-11'
    }
    useEffect(() => {
        setUpLayout();
    }, []);

    const handleSelection = async (id) => {
        setSelectedId(id);
        setModalData(await getSprinklerData(id));
    }
    useEffect(() => {
        if (selectedId != "")
            setModalVisible(true);
    }, [modalData]);


    const changeSprinklerState = async (isEnabled) => {
        let id = "";
        let temp = layout.map((row, rowIndex) => (
            row.map((item, index) => {
                if (item._id == selectedId) {
                    return { ...item, ifOn: isEnabled };
                }
                return item;

            })
        ))
        setLayout(temp);

        await updateSprinklerMode(selectedId, isEnabled);
        console.log("calling Now");
        setNumberofSprinklersOn(await getNumberofSprinklerOn());
    }
    const { width } = Dimensions.get('window');
    const buttonWidth = width - 60;
    return (
        <SafeAreaView >
            <BackButton navigation={navigation} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}


            >
                <StatusModal setModalVisible={setModalVisible} modalData={modalData} changeSprinklerState={changeSprinklerState} />
            </Modal>
            <View className="px-6 h-screen">
                <View className="mt-10 bg-[#649468] py-8 rounded-3xl px-6 flex flex-row justify-between items-center">
                    <View>
                        <Text className="text-white text-2xl font-bold w-32">
                            Welcome User!
                        </Text>
                        <Text className="text-white mt-2 text-lg">
                            {numberofSprinklersOn} Sprinklers on
                        </Text>
                    </View>
                    <View>
                        <CircularProgress value={90} progressValueColor={'white'} inActiveStrokeColor={'white'} inActiveStrokeOpacity={0.5} inActiveStrokeWidth={20}
                            activeStrokeWidth={23} activeStrokeColor={'white'} />

                    </View>
                </View>

                <View className="mt-10">
                    <View>
                        <Text className="text-[#365E3A] text-2xl font-semibold">
                            Current Status
                        </Text>
                        <ScrollView className="h-80">
                            <View className="mt-2 flex items-center">
                                <View className="mt-4 flex px-4 gap-1">
                                    {layout.map((item, itemIndex) => (
                                        <View className="flex gap-1 flex-row" key={itemIndex}>
                                            {
                                                item.map((x, index) => (
                                                    <TouchableOpacity className={`rounded-lg aspect-square border ${p} ${x.ifOn ? "bg-[#649468]" : ""}`}
                                                        onPress={() => { handleSelection(x._id) }}
                                                        key={index}>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    )
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity className="bg-[#649468] rounded-xl absolute left-[30px] bottom-20" style={{ width: buttonWidth }} >
                    <Text className="text-center py-3 font-bold text-[15px]">Get Monthly Report</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Dashboard