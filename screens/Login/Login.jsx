import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { Box, Button, FormControl, Heading, Icon, Input, VStack, WarningIcon } from 'native-base'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyboardAvoidingWrapper'
import { LoginSchema } from './loginSchema'
import { MaterialIcons } from "@expo/vector-icons";
import useFirebase from '../../hooks/useFirebase'

const Login = () => {
    const [show, setShow] = useState()
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(LoginSchema)
    })
    const navigation = useNavigation()
    const { loginUser } = useFirebase()

    const onSubmit = (data) => {
        loginUser(data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingWrapper>
                <Box alignItems='center' justifyContent='center' my={3} height='200'>
                    <Heading size='2xl' mb={5}>Ingresa a la app</Heading>
                    <Text fontSize="lg" textAlign='center'>Ingresa a la app con tu email y contraseña</Text>
                </Box>
                <Box mx={10}>
                    <VStack space={4} alignItems="center">
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
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    )
}

export default Login