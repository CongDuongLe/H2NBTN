import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Screens/Home.js'
import MyCart from './Components/Screens/MyCart.js'
import ProductInfo from './Components/Screens/ProductInfo.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home"
       screenOptions={{
        headerShown: false,}}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product Info" component={ProductInfo} />
      <Stack.Screen name="My Cart" component={MyCart} />
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
