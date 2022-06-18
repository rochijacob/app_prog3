import React from 'react'
import { AspectRatio, Box, Center, Heading, Image, Stack, Text } from 'native-base'

const PostPreview = ({ data }) => {
    console.log(data)
    return (
        <Box maxW="80" marginTop='2' rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                    <Image source={{ uri: data.data.photo }} />
                </AspectRatio>
                <Center bg="blue.900" _dark={{
                    bg: "violet.500"
                }} _text={{
                    color: "warmGray.50",
                    fontWeight: "600",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {data.data.owner}
                </Center>
            </Box>
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                        {data.data.title}
                    </Heading>
                    <Text fontSize="xs" _light={{
                        color: "blue.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        {data.data.description}
                    </Text>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PostPreview