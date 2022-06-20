import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Posts, Post } from '../../screens/screens'

const { Navigator, Screen } = createNativeStackNavigator()

const PostStack = () => {
    return (
        <Navigator >
            <Screen name='All Posts' component={Posts} />
            <Screen name='Post' component={Post} />
        </Navigator>
    )
}

export default PostStack