import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, FlatList, Heading, HStack, Text } from 'native-base'
import useFirebase from '../../hooks/useFirebase'
import { UserContext } from '../../providers/userContext'
import HeaderProfile from '../../components/profile/HeaderProfile'
import PostPreview from '../Posts/PostPreview'
import { auth } from '../../db/firebaseConfig'

const Profile = () => {
    const { logoutUser } = useFirebase()
    const { posts } = useContext(UserContext)
    const [personalPosts, setPersonalPosts] = useState([])

    useEffect(() => {
        const filterPosts = posts.filter((element) => element.data.owner.toLowerCase() === auth.currentUser.email.toLowerCase())
        setPersonalPosts(filterPosts)
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
            <Box style={{ flex: 0.4, width: '100%', }}>
                <HeaderProfile />
                <Button marginX={2} onPress={logoutUser}>Logout</Button>
            </Box>
            <Box style={{ flex: 0.6, width: '100%', paddingVertical: 12 }}>
                <Heading>Tus Posteos:</Heading>
                {posts.length > 0 ? <FlatList showsVerticalScrollIndicator={false} style={{ flex: 1, height: '100%', width: '100%' }} data={personalPosts} renderItem={({ item }) => <View style={{ flex: 1, alignItems: 'center' }}><PostPreview navigate={false} data={item} /></View>} /> : <Text>No hay posts</Text>}
            </Box>
        </View>
    )
}

export default Profile