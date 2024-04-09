import { ActivityIndicator, Text, View } from 'react-native'

const Loader = ({ message }) => {
    return (
        <View className="flex absolute top-60 left-40 items-center pt-20"><ActivityIndicator size="20" color="#649468" />
            <Text>{message}</Text>
        </View>
    )
}

export default Loader