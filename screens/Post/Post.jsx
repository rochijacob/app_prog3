import { ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AspectRatio, Box, Button, Heading, HStack, IconButton, Image, Input, Stack, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import useFirebase from '../../hooks/useFirebase';
import { auth } from '../../db/firebaseConfig';
import { UserContext } from '../../providers/userContext';
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyboardAvoidingWrapper';

const Post = () => {
    const route = useRoute()
    const { data } = route.params
    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [postData, setPostData] = useState({})
    const { posts } = useContext(UserContext)
    const { likePost, unLikePost, postComment, deleteComment, deletePost } = useFirebase()
    const navigation = useNavigation()

    useEffect(() => {
        const postMatch = posts.filter(value => value.id === data.id)

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
    }, [])

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
            setLiked(true)
        } else {
            console.log('unlike post')
            unLikePost(data.id)
            setLiked(false)
        }
    }

    const handleClick = () => {
        postComment(comment, data.id)
        setComment('')
        console.log('Rochi')
    }

    return (
        <ScrollView>
            <KeyboardAvoidingWrapper>
                <Box display={{ flex: 1, alignContent: 'center' }}>
                    <AspectRatio ratio={16 / 9}>
                        <Image alt='imagen' source={{ uri: data.data.photo }} />
                    </AspectRatio>
                    <Stack space={4} marginX={4} marginY={2}>
                        <HStack justifyContent='space-between' alignItems='center'>
                            <HStack alignItems='center' >
                                <IconButton onPress={likear} borderRadius={50} icon={<Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />} />
                                <Text>{postData?.data?.likes?.length}</Text>
                            </HStack>
                            {auth?.currentUser?.email === postData?.data?.owner &&
                                <IconButton onPress={() => {
                                    deletePost(postData.id)
                                    navigation.navigate('All Posts')
                                }} borderRadius={50} icon={<Ionicons name={"trash"} size={18} color="black" />} />
                            }
                        </HStack>
                        <Heading size="md" ml="-1">
                            {data?.data?.title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "blue.500"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {postData?.data?.description}
                        </Text>
                        <Heading size="sm" >
                            Comments
                        </Heading>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 100 }}>
                            {postData?.data?.comments.map((comment, i) => (
                                <Box key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    <Box style={{ flexDirection: 'row' }}>
                                        <Text fontWeight='500' color='blue.500'>{`${comment.owner}: `}</Text>
                                        <Text>{comment.text}</Text>
                                    </Box>
                                    {comment?.owner === auth.currentUser.email &&
                                        <IconButton onPress={() => deleteComment(comment.createdAt, data.id)} borderRadius={50} icon={<Ionicons name="close-outline" size={16} color="black" />} />
                                    }
                                </Box>
                            ))}
                        </ScrollView>
                        <Input onChangeText={(text) => setComment(text)} value={comment} placeholder='Comment' InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={() => handleClick()} >Post</Button>} />
                    </Stack>
                </Box>
            </KeyboardAvoidingWrapper>
        </ScrollView>
    )
}

export default Post