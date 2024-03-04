import { Image, Text, TouchableOpacity, View } from "react-native"
import { BackButton } from "./BackButton"

export const ProgressBar = ({ navigation, progress }) => {
    return (
        <View className="flex gap-3 mt-1 justify-center flex-row items-center">
            <BackButton navigation={navigation} />

            <View className="w-8/12 h-4 flex flex-row">
                <View className={`w-1/2 ${progress === 1 ? 'bg-[#649468] z-20 rounded-xl ' : 'bg-[#D9D9D9] rounded-l-xl'}`}>
                </View>
                <View className={`w-1/2 -ml-1 rounded-r-xl ${progress === 2 ? 'bg-[#649468] z-20 rounded-xl' : 'bg-[#D9D9D9]'}  `}>
                </View>
            </View>
            <View>
                <Text className="font-bold">
                    {progress}/2
                </Text>
            </View>
        </View>
    )
}
