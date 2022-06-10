import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default function Register() {
    const navigation = useNavigation()
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            user: '',
            password: '',
        }
    })

    const onSubmit = data => console.log(data)
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Register</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="firstName"
            />
            {errors.firstName && <Text>This is required.</Text>}
            <Button title='Volver' onPress={() => navigation.goBack()} />
        </View>
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
    input: {
        backgroundColor: 'white',
        borderColor: 'none',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});