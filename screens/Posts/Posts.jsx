import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useFirebase from '../../hooks/useFirebase'
import { UserContext } from '../../providers/userContext'
import { Box, FlatList, Input, IconButton } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostPreview from './PostPreview'
import { Ionicons } from '@expo/vector-icons';


const Posts = () => {
    const { posts } = useContext(UserContext)
    const [filteredPosts, setFilteredPosts] = useState([])
    const [search, setSearch] = useState('')
    const { fetchPosts } = useFirebase()
    console.log('posts', posts)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        setFilteredPosts(posts)
    }, [posts])


    useEffect(() => {
        console.log(search.length)
        const filterPosts = search.length > 0 ? posts.filter((element) => element.data.owner.toLowerCase().includes(search.toLowerCase())) : posts
        setFilteredPosts(filterPosts)
    }, [search])



    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Box marginY={1} style={{ width: '100%', paddingHorizontal: 30 }}>
                <Input onChangeText={(value) => setSearch(value)} placeholder='Buscar' InputRightElement={
                    <IconButton icon={<Ionicons name="search" size={16} color="black" />} />
                } />
            </Box>
            {posts.length > 1 ? <FlatList showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%' }} data={filteredPosts} renderItem={({ item }) => <View style={{ flex: 1, alignItems: 'center' }}><PostPreview navigate={true} data={item} /></View>} /> : <Text>No hay posts</Text>}
        </SafeAreaView>
    )
}

export default Posts