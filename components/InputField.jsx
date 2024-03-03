import React from 'react'
import { Text, TextInput, View } from 'react-native'

const InputField = ({ title, inputdata, setData }) => {
    return (
        <View className="px-10 mt-6">
            <Text>
                {title}
            </Text>
            <TextInput className="mt-1 border py-2 px-2 rounded-xl" value={inputdata} placeholder={`Enter ${title}`} onChangeText={(text) => setData(text)} secureTextEntry={title == "Password" ? true : false} />
        </View>
    )
}

export default InputField