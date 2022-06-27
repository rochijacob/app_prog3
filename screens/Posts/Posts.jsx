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
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const { fetchPosts, fetchUsers } = useFirebase()


    const fetchU = async () => {
        const users = await fetchUsers()
        setUsers(users)
        console.log('found', users.length, 'users')
    }

    useEffect(() => {
        setSearch('')
        fetchPosts()
        fetchU()
    }, [])

    useEffect(() => {
        setFilteredPosts(posts)
        setFilteredUsers(users)
    }, [posts, users])


    useEffect(() => {
        const filterPosts = search.length > 0 ? posts.filter((element) => element.data.owner.toLowerCase().includes(search.toLowerCase())) : posts
        setFilteredPosts(filterPosts)
        console.log('filter posts', filterPosts.length)

        const filteredUsers =
            search.length > 0 ? users.filter((element) =>
                element.data.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) : users;
        setFilteredUsers(filteredUsers)
        console.log('filtered users', filteredUsers.length)
    }, [search])



    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Box marginY={1} style={{ width: '100%', paddingHorizontal: 30 }}>
                <Input onChangeText={(value) => setSearch(value)} placeholder='Buscar' InputRightElement={
                    <IconButton icon={<Ionicons name="search" size={16} color="black" />} />
                } />
            </Box>
            {filteredUsers.length > 0 ? (filteredPosts.length > 0 ? <FlatList showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%' }} data={filteredPosts} renderItem={({ item }) => <View style={{ flex: 1, alignItems: 'center' }}><PostPreview navigate={true} data={item} /></View>} /> : <View style={{ flex: 1, width: '100%', alignItems: 'center' }}><Text>No hay posts para este usuario</Text></View>) : <View style={{ flex: 1, width: '100%', alignItems: 'center' }}><Text>No hay posts</Text></View>}
        </SafeAreaView>
    )
}

export default Posts