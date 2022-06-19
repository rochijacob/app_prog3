import React from 'react'
import { AspectRatio, Box, Center, Heading, Image, Pressable, Stack, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const PostPreview = ({ data }) => {
    const navigation = useNavigation()
    console.log(data)
    return (
        <Pressable style={{ width: '80%' }} onPress={() => navigation.navigate('Post', { data: data })}>
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
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {data?.data?.title}
                            </Heading>
                            <Text fontSize="xs" _light={{
                                color: "blue.500"
                            }} _dark={{
                                color: "violet.400"
                            }} fontWeight="500" ml="-0.5" mt="-1">
                                {data?.data?.description}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            }}
        </Pressable>
    )
}

export default PostPreview