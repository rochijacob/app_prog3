import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import InitialNavigator from './navigation/InitialNavigator';
import { AuthProvider } from './providers/authContext';
import { UserProvider } from './providers/userContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
      <AuthProvider>
        <UserProvider>
          <InitialNavigator />
          <Toast />
        </UserProvider>
      </AuthProvider>
      </Center>
    </NativeBaseProvider>
  );
}
