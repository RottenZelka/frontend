import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SchoolLogInScreen = ({ navigation }) => {
  const [abbreviation, setAbbreviation] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://oneid-for-school-f1e0b199f01f.herokuapp.com/loginSchool', {
        abbreviation,
        password,
      });
      const token = response.data.token;
      navigation.navigate('SchoolHomeScreen', { token });
    } catch (error) {
      Alert.alert('Error', 'Error logging in to school');
      console.error('Error logging in to school:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Abbreviation"
        value={abbreviation}
        onChangeText={setAbbreviation}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Log In" onPress={handleLogin} />
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

export default SchoolLogInScreen;
