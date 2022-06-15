import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '../../providers/userContext'
import BottomTabsNavigator from './BottomTabsNavigator'

const { Navigator, Screen } = createNativeStackNavigator()

const AppNavigator = () => {
    const { user } = useContext(UserContext)
    console.log('Esto es el App Navigator')
    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }}>
                    <Screen name={'BottomTabs'} component={BottomTabsNavigator} />
                </Navigator>
            </NavigationContainer>
        </SafeAreaView>

    )
}

export default AppNavigator