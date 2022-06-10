import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, Button } from 'react-native'

const Login = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Onboarding</Text>
            <Button title='Volver' onPress={() => navigation.goBack()} />
        </View>

    )
}

export default Login