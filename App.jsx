import React from 'react';
import Login from './src/components/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './src/components/Signup';


const App = () => {
  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='signup' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
