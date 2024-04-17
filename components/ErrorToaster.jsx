import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native"

const ErrorToaster = ({ message, setError }) => {
    const slideAnim = useRef(new Animated.Value(1000)).current;
    useEffect(() => {
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();

        setTimeout(() => {
            Animated.timing(
                slideAnim,
                {
                    toValue: 1000,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start(() => setError(""));
        }, 3000);
        return () => { console.log("wordked"); setError(""); }
    }, []);
    return (
        <Animated.View
            style={{
                transform: [{ translateX: slideAnim }],
            }}>
            <View className="absolute top-10 right-5 bg-red-500 p-2 rounded-xl">
                <Text className="text-white">
                    {message}
                </Text>
            </View>
        </Animated.View>
    )
}

export default ErrorToaster