import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { View, Alert, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Box, Button, FormControl, Heading, Icon, Input, VStack, WarningIcon, Text } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { RegisterSchema } from './registerschema';
import useFirebase from '../../hooks/useFirebase';
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyboardAvoidingWrapper';

export default function Register() {
    const navigation = useNavigation()
    const [show, setShow] = useState()
    const { registerUser } = useFirebase()
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            user: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(RegisterSchema)
    })

    const onSubmit = (data) => {
        registerUser(data)
    }
    return (
        <KeyboardAvoidingWrapper>
            <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                <Box alignItems='center' justifyContent='center' my={3} height='200'>
                    <Heading size='2xl' mb={5}>Registrate</Heading>
                    <Text fontSize="lg" textAlign='center'>Ingresa un usuario y asocialo a tu email para acceder a la app</Text>
                </Box>
                <Box mx={10}>
                    <VStack space={4} alignItems="center">
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={errors.name ? true : false}>
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Nombre y Apellido'
                                        size='xl'
                                        variant='rounded'
                                        InputLeftElement={<Icon as={<MaterialIcons name='person' />} size={5} ml="2" color="muted.400" />}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningIcon size='xs' />}>
                                        Debes ingresar un usuario valido
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )}
                            name="name"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={errors.email ? true : false}>
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Email'
                                        size='xl'
                                        variant='rounded'
                                        InputLeftElement={<Icon as={<MaterialIcons name='mail' />} size={5} ml="2" color="muted.400" />}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningIcon size='xs' />}>
                                        Debes ingresar un email valido
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )}
                            name="email"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl isInvalid={errors.password ? true : false}>
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Password'
                                        size='xl'
                                        variant='rounded'
                                        type={show ? "text" : "password"}
                                        InputLeftElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} ml="2" color="muted.400" onPress={() => setShow(!show)} />}
                                    />
                                    {errors.password ?
                                        <FormControl.ErrorMessage leftIcon={<WarningIcon size='xs' />}>
                                            Debes ingresar una contraseña
                                        </FormControl.ErrorMessage> :
                                        <FormControl.HelperText>
                                            Debe tener 6 caracteres
                                        </FormControl.HelperText>
                                    }
                                </FormControl>
                            )}
                            name="password"
                        />

                    </VStack>
                    <VStack space={4} alignItems='center' mt={10}>
                        <Button w='100%' borderRadius={30} onPress={handleSubmit(onSubmit)}>Submit</Button>
                        <Button variant='ghost' borderRadius={30} colorScheme='secondary' onPress={() => navigation.goBack()} >Volver</Button>
                    </VStack>
                </Box>

            </View>
        </KeyboardAvoidingWrapper>
    )
}


const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        backgroundColor: '#0e101c',
    },
});