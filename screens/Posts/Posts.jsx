import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import useFirebase from '../../hooks/useFirebase'
import { UserContext } from '../../providers/userContext'
import { Box, FlatList } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostPreview from './PostPreview'

const Posts = () => {
    const { posts } = useContext(UserContext)
    const { fetchPosts } = useFirebase()
    console.log('posts', posts)

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', marginBottom: 10 }}>
            {posts.length > 1 ? <FlatList style={{ flex: 1, width: '100%' }} data={posts} renderItem={({ item }) => <View style={{ flex: 1, alignItems: 'center' }}><PostPreview data={item} /></View>} /> : <Text>No hay posts</Text>}
        </SafeAreaView>
    )
}

export default Posts