import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Home } from './pages/Home';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Feature } from './pages/Feature';
import { FarmLayout } from './pages/FarmLayout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="FarmLayout" component={FarmLayout} />
        <Stack.Screen
          name="FeatureSelect" component={Feature} />
        <Stack.Screen
          name="Home" component={Home} />
        <Stack.Screen
          name="Login" component={Login} />
        <Stack.Screen
          name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
