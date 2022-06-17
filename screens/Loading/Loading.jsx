import { Spinner } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'


const Loading = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size='lg' />
        </View>

    )
}

export default Loading