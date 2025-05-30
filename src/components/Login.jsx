import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../style'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(email, password);
    const userData = {
      email: email,
      password: password,
    };

    axios.post('http://192.168.1.30:5001/login-user', userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Logged In Successfully');
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          AsyncStorage.setItem('userType', res.data.userType);

          if (res.data.userType === "Admin") {
            navigation.navigate('AdminScreen');
          } else {
            navigation.navigate('Home');
          }
        } else {
          Alert.alert('Login failed, please check your credentials');
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        Alert.alert('An error occurred, please try again later');
      });
  }

  const getData = async () => {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
  };

  useEffect(() => {
    getData();
    console.log("Hii");
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'always'}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../assets/mainLogo.png')} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Mobile or Email"
              style={styles.textInput}
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              value={password}
              secureTextEntry={true}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
          </View>

          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}>
            <Text style={{ color: '#420475', fontWeight: '700' }}>Forgot Password</Text>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <Text style={styles.textSign}>Log in</Text>
          </TouchableOpacity>

          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>----Or Continue as----</Text>
          </View>

          <View style={styles.bottomButton}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome name="user-circle-o" color="white" style={styles.smallIcon2} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Guest</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => navigation.navigate('Register')}>
                <FontAwesome name="user-plus" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => alert('Coming Soon')}>
                <FontAwesome name="google" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.inBut2} onPress={() => alert('Coming Soon')}>
                <FontAwesome name="facebook-f" color="white" style={[styles.smallIcon2, { fontSize: 30 }]} />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Facebook</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Login;
