import React, { useEffect, useState } from 'react'
import { AspectRatio, Box, Center, Heading, HStack, IconButton, Image, Pressable, Stack, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../db/firebaseConfig';

import useFirebase from '../../hooks/useFirebase';

const PostPreview = ({ data, navigate }) => {
    const [liked, setLiked] = useState(false)
    const navigation = useNavigation()
    const { likePost, unLikePost, deletePost } = useFirebase()

    useEffect(() => {
        const match = data.data.likes.findIndex(element => {
            if (element.includes(auth.currentUser.email)) {
                return true
            } else {
                return false
            }
        })
        console.log(match)
        if (match === -1) {
            setLiked(false)
        } else {
            setLiked(true)
        }
    }, [])

    const likear = () => {
        const match = data.data.likes.findIndex(element => {
            if (element.includes(auth.currentUser.email)) {
                return true
            } else {
                return false
            }
        })
        if (match === -1) {
            console.log('like post')
            likePost(data.id)
            setLiked(true)
        } else {
            console.log('unlike post')
            unLikePost(data.id)
            setLiked(false)
        }
        console.log(match)
    }


    return (
        <Pressable style={{ width: '80%' }} onPress={() => { navigate && navigation.navigate('Post', { data: data }) }}>
            {({ isHovered }) => {
                return <Box marginTop='2' rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" bg={isHovered ? 'coolGray.200' : 'coolGray.100'}>
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image alt='imagen' source={{ uri: data?.data?.photo }} />
                        </AspectRatio>
                        <Center bg="blue.900" _text={{
                            color: "warmGray.50",
                            fontWeight: "600",
                            fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            {data?.data?.owner}
                        </Center>
                    </Box>
                    <Stack p="4" space={3}>
                        <HStack>
                            <HStack alignItems='center'>
                                <IconButton onPress={likear} borderRadius={50} icon={<Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />} />
                                <Text>{data.data.likes.length}</Text>
                            </HStack>
                            <HStack alignItems='center' ml={10}>
                                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                                <Text ml={2}>{data.data.comments.length}</Text>
                            </HStack>
                        </HStack>
                        <Stack space={2}>
                            <Heading size="md">
                                {data?.data?.title}
                            </Heading>
                            <Text fontSize="xs" _light={{
                                color: "blue.500"
                            }} fontWeight="500" >
                                {data?.data?.description}
                            </Text>
                        </Stack>
                        {data.data.owner === auth.currentUser.email &&
                            <Stack space={0}>
                                <HStack justifyContent='flex-end'>
                                    <IconButton onPress={() => deletePost(data.id)} borderRadius={50} icon={<Ionicons name={"trash"} size={18} color="black" />} />
                                </HStack>
                            </Stack>
                        }
                    </Stack>
                </Box>
            }}
        </Pressable>
    )
}

export default PostPreview