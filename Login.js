import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[token,storedToken]=useState(null)

  const [logindata, setLoginData] = useState(null);
  const [loginerror, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
        setLoading(true);
      // Make HTTP POST request to your backend API
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      // Handle successful login response
      console.log('Login successful:', response.data);

      // Clear the input fields
      //setUsername('');
      //setPassword('');
      await AsyncStorage.setItem('auth',response.data.token)
      console.log('token', response.data.token);
        // Call the function to retrieve data
        retriveData();
      //Alert.alert('Login Successfully');

    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
      //Alert.alert('Login Failed', 'Invalid username or password.');
    }
    finally {
        setLoading(false);
      }
  };

 
    const retriveData = async () => {

        try{
            const value = await AsyncStorage.getItem('auth');
            if (value !== null) {
                // If a value is found, set it to state
                storedToken(value);

                try{
                    const response = await axios.get('https://dummyjson.com/auth/me', {
                        headers: {
                            Authorization: `Bearer ${value}`
                          }
                      });

                      setLoginData(response.data)
                      setLoginError(null)
                      if(logindata !== null)
                      {
                        Alert.alert('Login Successfully',response.data.firstName); 
                      }
                      
                }
                catch(error)
                {
                    setLoginData(null)
                    setLoginError(error)
                    console.error('Login error:', error);
                    //Alert.alert('Login Failed', 'Invalid username or password');
                }

              }
        }
        catch(error)
        {
            console.error('Error retrieving data:', error);
        }
    };
   



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

        {loading? 
        (<ActivityIndicator size="large" color="#0000ff" />) : (
            <Text></Text>
          )
      }
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Login;