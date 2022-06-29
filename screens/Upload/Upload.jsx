import { View, Text, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, storage } from '../../db/firebaseConfig'
import { AspectRatio, Box, Button, HStack, IconButton, Image, Input, Pressable, useToast, VStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFirebase from '../../hooks/useFirebase';

const Upload = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(CameraType.back)
    const [data, setData] = useState({
        image: false,
        titulo: '',
        description: '',
    })
    const { submitPost } = useFirebase()
    const toast = useToast()
    let camera

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const openCamera = () => {
        if (hasPermission === false) {
            toast.show({
                description: 'No tenes acceso a la camara',
                placement: 'top'
            })
        } else {
            setModalVisible(true)
        }
    }

    const savePicture = (img) => {
        fetch(img)
            .then(response => response.blob())
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => setData({ ...data, image: url }))
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    const takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        savePicture(photo.uri)
        setModalVisible(!modalVisible)
    }

    const postData = () => {
        if (data.image !== false && data.titulo !== '' &&
            data.description !== '') {
            submitPost(data)
            setData({
                image: false,
                titulo: '',
                description: '',
            })
            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        Tu posteo se subio exitosamente
                    </Box>;
                }
            });
        } else {
            toast.show({
                description: 'Debes llenar el formulario',
                placement: 'top'
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 0.5, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Pressable onPress={openCamera}>
                        <Box ratio={16 / 9} w='200' h='100' style={{ backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' }}>
                            {data.image ? <AspectRatio w="100%" ratio={16 / 9}><Image alt='imagen' source={{ uri: data.image }} /></AspectRatio> : <Ionicons name="image" size={24} color="black" />}
                        </Box>
                    </Pressable>
                    <VStack space={3} w={200}>
                        <Input value={data.titulo} size='lg' variant="underlined" placeholder="Titulo de la foto" onChangeText={(text) => setData({ ...data, titulo: text })} />
                        <Input value={data.description} size='lg' variant="underlined" placeholder="Descripcion" onChangeText={(text) => setData({ ...data, description: text })} />
                    </VStack>
                    <Button onPress={postData}>Postear</Button>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: '100%',
                    }}>
                        <Camera type={type} style={{ flex: 1, width: '100%', paddingVertical: 20 }} ref={(r) => {
                            camera = r
                        }}>
                            <Box alignItems='center' style={{ height: '100%', paddingVertical: 20 }}>
                                <VStack alignItems='left' justifyContent='space-between' style={{ height: '100%' }}>
                                    <HStack>
                                        <IconButton onPress={() => setModalVisible(!modalVisible)} icon={<Ionicons name="close-sharp" size={24} color="white" />} borderRadius="full"
                                        />
                                        <IconButton onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} icon={<Ionicons name="repeat" size={24} color="white" />} borderRadius="full"
                                        />
                                    </HStack>
                                    <IconButton variant='solid' onPress={takePicture} icon={<Ionicons name="ios-camera" size={34} color="white" />} borderRadius="full"
                                    />
                                </VStack>

                            </Box>

                        </Camera>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default Upload