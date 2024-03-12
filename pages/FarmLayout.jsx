import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from "../components/ProgressBar";
import { Alert, Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { FarmLayoutModal } from '../components/FarmLayoutModal';
import { getLayout, updateLayoutData, updateSprinklerState } from '../helpers/helper';


export const FarmLayout = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cropType, setCropType] = useState("");
    const [sprinklerName, setSprinklerName] = useState("");
    const [layout, setLayout] = useState([]);
    const [selection, setSelection] = useState({});
    const [cropTypes, setCropTypes] = useState([]);
    const { width } = Dimensions.get('window');
    const buttonWidth = width - 60;
    let size = 0;
    const setUpLayout = async () => {
        let temp = await getLayout();
        size = temp.size;
        setLayout(temp.layout);
        setCropTypes(temp.cropTypes);
    }
    useEffect(() => {
        setUpLayout()
    }, [])
    let p = 'w-10'
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

    const handleSelection = (row, col, item) => {
        setCropType(item.cropType);
        setSprinklerName(item.sprinkerName);
        setModalVisible(true);
        setSelection({ row, col });
    }
    useEffect(() => {
        if (!modalVisible && cropType) {
            let id = "";
            let temp = layout.map((row, rowIndex) => (
                row.map((item, index) => {
                    if (rowIndex == selection.row && index == selection.col) { id = item._id; return { ...item, cropType: cropType, sprinklerName: sprinklerName } }
                    return item
                })
            ))
            setLayout(temp);
            updateSprinklerState(id, sprinklerName, cropType);
            setCropType("");
            setSprinklerName("");
        }
    }, [modalVisible])
    return (
        <SafeAreaView>
            <ProgressBar navigation={navigation} progress={2} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}


            >
                <FarmLayoutModal cropTypes={cropTypes} setModalVisible={setModalVisible} sprinklerName={sprinklerName} setSprinklerName={setSprinklerName} setCropType={setCropType} />
            </Modal>
            <View className="mt-10 h-screen">
                <Text className="px-10 text-3xl font-bold">Farm Layout </Text>
                <View className="flex items-center">
                    <View className="mt-4 flex px-4 gap-1">
                        {layout.map((item, itemIndex) => (
                            <View className="flex gap-1 flex-row" key={itemIndex}>
                                {
                                    item.map((x, index) => (
                                        <TouchableOpacity className={`rounded-lg aspect-square border ${p} ${(x.cropType.length != 0 || x.sprinklerName.length != 0) ? "bg-[#649468]" : ""}`}
                                            onPress={() => handleSelection(itemIndex, index, x)} key={index}>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        )
                        )}
                    </View>
                </View>
                <TouchableOpacity className="bg-[#649468] rounded-xl absolute left-[30px] bottom-28" style={{ width: buttonWidth }} onPress={() => navigation.navigate("Dashboard")}>
                    <Text className="text-center py-3 font-bold text-[15px]">Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}