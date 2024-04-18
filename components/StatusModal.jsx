import { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View ,TextInput} from "react-native"
import { SelectList } from "react-native-dropdown-select-list";
import InputField from "./InputField";
import { FontAwesome } from '@expo/vector-icons';
export const StatusModal = ({ setModalVisible, modalData, changeSprinklerState }) => {
    const [isEnabled, setIsEnabled] = useState(modalData.ifOn);
    const toggleSwitch = () => { setIsEnabled(previousState => !previousState) };
    // const [time, setTime] = useState(modalData.time ? modalData.time : ["00:00:00", "00:00:00"]);
    // const [time1, setTime1] = useState(modalData.time && modalData.time[0] ? modalData.time[0] : "00:00:00");
    // const [time2, setTime2] = useState(modalData.time && modalData.time[1] ? modalData.time[1] : "00:00:00");
    const [time1, setTime1] = useState(modalData.time && Array.isArray(modalData.time) && modalData.time[0] ? modalData.time[0] : "00:00:00");
    const [time2, setTime2] = useState(modalData.time && Array.isArray(modalData.time) && modalData.time[1] ? modalData.time[1] : "00:00:00");
    
    // console.log("time1:", time1);
    // console.log("time2:", time2);
    // console.log("time:", time);

    const [isAM, setIsAM] = useState("AM");
    const [isEditing, setIsEditing] = useState(false);
    // const [amt,setAmt]=useState(modalData.amt ? modalData.amt : [0,0]);
    const [amt1, setAmt1] = useState(modalData.amt &&modalData.amt[0] ? modalData.amt[0]:0);
    const [amt2, setAmt2] = useState(modalData.amt && modalData.amt[1] ? modalData.amt[1]:0);


    const handleAMPM = (value) => {
        setIsAM(value.toUpperCase());
        // setIsAM(previousState => !previousState);
    };

    const handleTime1Change = (value, index) => {
        // Validate input to allow only digits and maintain the format hh:mm:ss
        if (/^\d{0,2}$/.test(value)) {
            // setTime1(prevTime => {
            //     const newTime = prevTime.split(':');
            //     newTime[index] = value;
            //     return newTime.join(':');
            // });
            const newTime = [...time1.split(':')]; // Copy the current state
            newTime[index] = value;
            setTime1(newTime.join(':')); 
        }
    };
    const handleTime2Change = (value, index) => {
        // Validate input to allow only digits and maintain the format hh:mm:ss
        if (/^\d{0,2}$/.test(value)) {
            // setTime2(prevTime => {
            //     const newTime = prevTime.split(':');
            //     newTime[index] = value;
            //     return newTime.join(':');
            // });
            const newTime = [...time2.split(':')]; // Copy the current state
            newTime[index] = value;
            console.log("New time2:", newTime.join(':'));
            setTime2(newTime.join(':'));
        }
    };
    const handleModifyClick = () => {
        setIsEditing(true); 
    };
    
    const handleAccept = () => {
        // setTime();
        // setAmt();
        if (isEnabled !== modalData.sprinklerState) {
            changeSprinklerState(isEnabled, [time1, time2], [amt1, amt2]);
        }
        setModalVisible(false);
    };


    const handleAmt1Change=(value)=>
    {
        setAmt1(value);
    }
    const handleAmt2Change=(value)=>
    {
        setAmt2(value);
    }
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
                    {/* <View>
                        <TouchableOpacity className="bg-[#649468] rounded-xl " onPress={() => { if (isEnabled != modalData.sprinklerState) changeSprinklerState(isEnabled); setModalVisible(false) }}>
                            <Text className="text-center text-white py-3">Submit</Text>
                        </TouchableOpacity>
                    </View>     */}
                    {/* Section for Today's Schedule */}
                <View style={{ marginBottom: 20 }}>
                    <View style={{ backgroundColor: '#649468', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>TODAY'S SCHEDULE</Text>
                    </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' }}
                                value={time1.split(':')[0]}
                                onChangeText={(value) => handleTime1Change(value, 0)}
                                editable={isEditing}
                            />
                            <Text style={{ marginHorizontal: 5 }}>:</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' }}
                                value={time1.split(':')[1]}
                                onChangeText={(value) => handleTime1Change(value, 1)}
                                editable={isEditing}
                            />
                            <Text style={{ marginHorizontal: 5 }}>:</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' }}
                                value={time1.split(':')[2]}
                                onChangeText={(value) => handleTime1Change(value, 2)}
                                editable={isEditing}
                            />
                             {/* <TextInput
                                style={{ padding: 5, width: 40, textAlign: 'center', marginHorizontal: 5 }}
                                value={isAM}
                                onChangeText={handleAMPM}
                                editable={isEditing} // Conditionally render editable based on isEditing state
                            /> */}
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center',marginLeft:10 }}
                                value={amt1.toString()}
                                onChangeText={(value) => handleAmt1Change(value)}
                                editable={isEditing}
                                keyboardType="numeric"
                            />
                            <Text style={{marginLeft:10}}>mm</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' }}
                                value={time2.split(':')[0]}
                                onChangeText={(value) => handleTime2Change(value, 0)}
                                editable={isEditing}
                            />
                            <Text style={{ marginHorizontal: 5 }}>:</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' }}
                                value={time2.split(':')[1]}
                                onChangeText={(value) => handleTime2Change(value, 1)}
                                editable={isEditing}
                            />
                            <Text style={{ marginHorizontal: 5 }}>:</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' }}
                                value={time2.split(':')[2]}
                                onChangeText={(value) => handleTime2Change(value, 2)}
                                editable={isEditing}
                            />
                             {/* <TextInput
                                style={{ padding: 5, width: 40, textAlign: 'center', marginHorizontal: 5 }}
                                value={isAM}
                                onChangeText={handleAMPM}
                                editable={isEditing} // Conditionally render editable based on isEditing state
                            /> */}
                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 5, padding: 5, width: 40, textAlign: 'center' ,marginLeft:10}}
                                value={amt2.toString()}
                                onChangeText={(value) => handleAmt2Change(value)}
                                editable={isEditing}
                                keyboardType="numeric"
                            />
                            <Text style={{marginLeft:10}}>mm</Text>
                        </View>         
                    </View>
                    <View>
                        {/* <Text>{modalData.schedule.time}</Text> */}
                        {/* <Text>vgv,bgm,</Text> */}
                    </View>
                </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <TouchableOpacity style={{ backgroundColor: '#649468', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} onPress={() => { setTime([time1,time2]);setAmt([amt1,amt2]);if (isEnabled != modalData.sprinklerState) changeSprinklerState(isEnabled,time,amt); setModalVisible(false)}}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Accept</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ backgroundColor: '#649468', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} onPress={handleAccept}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: '#649468', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} onPress={handleModifyClick}>
                            <Text style={{ color: '#649468', textAlign: 'center' }}>Modify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </View >
        </View>
        

        

    )
}
