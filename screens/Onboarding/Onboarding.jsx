import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'

export default function Onboarding({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button.Group space={2} direction='column'>
                <Button size='lg' onPress={() => navigation.navigate('Register')}>Register</Button>
                <Button size='lg' onPress={() => navigation.navigate('Login')} >Login</Button>
            </Button.Group>
        </View>
    )
}