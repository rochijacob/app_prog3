import { View } from 'react-native'
import React, { useContext } from 'react'
import { Box, Button, HStack, Text } from 'native-base'
import useFirebase from '../../hooks/useFirebase'
import { UserContext } from '../../providers/userContext'
import HeaderProfile from '../../components/profile/HeaderProfile'

const Profile = () => {
    const { logoutUser } = useFirebase()
    const { user } = useContext(UserContext)

    console.log(user)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
            <Box style={{ flex: 1, width: '100%' }} my={3}>
                <HeaderProfile />

            </Box>
            <Button onPress={logoutUser}>Logout</Button>
        </View>
    )
}

export default Profile