import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://oneid-for-school-f1e0b199f01f.herokuapp.com/signup', {
        username,
        password,
        given_name: givenName,
        last_name: lastName,
        role_id: 1, 
      });

      // Assuming the server returns the JWT token in the response data
      const token = response.data.token;

      // Store the token in AsyncStorage or any other storage mechanism
      // AsyncStorage.setItem('token', token);

      // Alert the user
      Alert.alert('Success', 'User created successfully');

      // Navigate to the next screen passing the token
      navigation.navigate('StudentHomeScreen', { token }); 
    } catch (error) {
      Alert.alert('Error', 'Error signing up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Given Name"
        value={givenName}
        onChangeText={setGivenName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default SignUpScreen;
