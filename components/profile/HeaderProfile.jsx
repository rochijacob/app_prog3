import { View } from 'react-native'
import React, { useContext } from 'react'
import { Avatar, Box, HStack, Text } from 'native-base'
import { UserContext } from '../../providers/userContext'
import { stringAvatar, stringDates } from '../../helpers/helpers'

const HeaderProfile = () => {
    const { user } = useContext(UserContext)

    return (
        <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box style={{ width: '20%' }}>
                <Avatar size="lg" bg="blue.400" source={{
                    uri: user.photoUrl
                }}>
                    {stringAvatar(user.displayName).children}
                </Avatar>
            </Box>

            <Box style={{ width: '80%' }}>
                <HStack style={{ justifyContent: 'space-between', borderBottomWidth: 1.5, borderBottomColor: 'rgba(0,0,0,0.2)' }} my={2}>
                    <Text fontSize='lg'>Nombre</Text>
                    <Text fontSize='lg'>{user.displayName}</Text>
                </HStack>
                <HStack style={{ justifyContent: 'space-between', borderBottomWidth: 1.5, borderBottomColor: 'rgba(0,0,0,0.2)' }} my={2}>
                    <Text fontSize='lg'>Email</Text>
                    <Text fontSize='lg'>{user.email}</Text>
                </HStack>
                <HStack style={{ justifyContent: 'space-between', borderBottomWidth: 1.5, borderBottomColor: 'rgba(0,0,0,0.2)' }} my={2}>
                    <Text fontSize='lg'>Last Login</Text>
                    <Text fontSize='lg'>{stringDates(user.metadata.lastSignInTime)}</Text>
                </HStack>
            </Box>
        </View>
    )
}

export default HeaderProfile