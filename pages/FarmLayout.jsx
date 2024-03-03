import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from "../components/ProgressBar";
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { FarmLayoutModal } from '../components/FarmLayoutModal';


export const FarmLayout = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cropType, setCropType] = useState("");
    const [sprinklerName, setSprinklerName] = useState("");
    let grid = [7, 6, 5, 4, 3, 2, 1];
    let temp = [];
    let size = 0;
    for (let i = 0; i < grid.length; i++) {
        temp.push(Array(grid[i]).fill(0));
        size = Math.max(size, grid[i]);
    }
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

    const handleSelection = () => {
        setModalVisible(true)
    }
    const [close, setClose] = useState("sdf");
    return (
        <SafeAreaView>
            <ProgressBar navigation={navigation} progress={2} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}

                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');

                }}
                onDismiss={() => { setClose("closing"); }}
            >
                <FarmLayoutModal setModalVisible={setModalVisible} sprinklerName={sprinklerName} setSprinklerName={setSprinklerName} setCropType={setCropType} />
            </Modal>
            <View className="mt-10">
                <Text className="px-10 text-3xl font-bold">Farm Layout {close}</Text>
                <View className="flex items-center">
                    <View className="mt-4 flex px-4 gap-1">
                        {temp.map((item) => (
                            <View className="flex gap-1 flex-row">
                                {
                                    item.map((x) => (
                                        <TouchableOpacity className={`rounded-lg aspect-square border ${p}`}
                                            onPress={handleSelection}></TouchableOpacity>
                                    ))
                                }
                            </View>
                        )
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )

}