import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Profile, Posts, Upload } from '../../screens/screens'
import Ionicons from '@expo/vector-icons/Ionicons';
import tabroutes from './tabroutes'
import PostStack from './PostStack'


const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabsNavigator = () => {
    return (
        <View style={{ flex: 1 }} >
            <Divider />
            <Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person'
                            : 'person-outline';
                    } else if (route.name === 'PostStack') {
                        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
                    } else if (route.name === 'Upload') {
                        iconName = focused ? 'ios-camera' : 'ios-camera-outline'
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0398fc',
                tabBarInactiveTintColor: 'gray',
            })} initialRouteName={tabroutes.POSTSTACK}>
                <Screen name='Profile' component={Profile} />
                <Screen name='Upload' component={Upload} />
                <Screen name='PostStack' component={PostStack} />
            </Navigator>
        </View>
    )
}

export default BottomTabsNavigator