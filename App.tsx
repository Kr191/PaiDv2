import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FloorSelectScreen from './screens/FloorSelectScreen';
import RoomSelectScreen from './screens/RoomSelectScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FloorSelect">
          <Stack.Screen 
            name="FloorSelect" 
            component={FloorSelectScreen} 
            options={{ 
                  title: 'PAI-D',
                  headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#4B5AC7',
                },
            }}/>

          <Stack.Screen 
            name="RoomSelect" 
            component={RoomSelectScreen} 
            options={{ 
              title: 'PAI-D',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#4B5AC7',
              },
            }}/>

          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ 
              title: 'PAI-D Map',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#4B5AC7',
              },
            }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
