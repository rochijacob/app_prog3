import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Onboarding({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Onboarding</Text>
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
            <Button title='Login' onPress={() => navigation.navigate('Login')} />
        </View>
    )
}