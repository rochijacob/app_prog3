import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import routes from './routes';
import Onboarding from '../../screens/Onboarding/Onboarding';
import { Login } from '../../screens/screens';
import Register from '../../screens/Register/Register';

const { Navigator, Screen } = createNativeStackNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}



const LoginNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'red', width: '100%' }}>
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }} initialRouteName={routes.ONBOARDING}>
                    <Screen name='Onboarding' component={Onboarding} />
                    <Screen
                        name="Login"
                        children={() => (
                            //Otra forma de hacer el screen y pasar props
                            <Login />
                        )}
                    />
                    <Screen
                        name="Register"
                        component={Register}
                    // children={() => (
                    //     //Otra forma de hacer el screen y pasar props
                    //     <Register />
                    // )}
                    />
                </Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default LoginNavigator