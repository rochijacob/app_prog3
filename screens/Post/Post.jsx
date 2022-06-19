import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { AspectRatio, Box, Heading, HStack, IconButton, Image, Stack, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import useFirebase from '../../hooks/useFirebase';
import { auth } from '../../db/firebaseConfig';
import { UserContext } from '../../providers/userContext';

const Post = () => {
    const route = useRoute()
    const { data } = route.params
    const [liked, setLiked] = useState(false)
    const [postData, setPostData] = useState({})
    const { posts } = useContext(UserContext)
    const { likePost, unLikePost } = useFirebase()

    useEffect(() => {
        const postMatch = posts.filter(value => value.id === data.id)
        console.log('post match', postMatch[0])

        const match = postMatch[0].data.likes.findIndex(element => {
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
        setPostData(postMatch[0])
    })

    const likear = () => {
        const postMatch = posts.filter(value => value.id === data.id)
        setPostData(postMatch[0])
        const match = postMatch[0].data.likes.findIndex(element => {
            if (element.includes(auth.currentUser.email)) {
                return true
            } else {
                return false
            }
        })
        if (match === -1) {
            console.log('like post')
            likePost(data.id)
        } else {
            console.log('unlike post')
            unLikePost(data.id)
        }
        console.log(match)
    }

    return (
        <View>
            <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                    <Image alt='imagen' source={{ uri: data.data.photo }} />
                </AspectRatio>
                <Stack space={4} marginX={4} marginY={2}>
                    <HStack alignItems='center' >
                        <IconButton onPress={likear} borderRadius={50} icon={<Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />} />
                        <Text>{postData?.data?.likes?.length}</Text>
                    </HStack>
                    <Heading size="md" ml="-1">
                        {data?.data?.title}
                    </Heading>
                    <Text fontSize="xs" _light={{
                        color: "blue.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        {postData?.data?.description}
                    </Text>
                </Stack>
            </Box>
        </View>
    )
}

export default Post