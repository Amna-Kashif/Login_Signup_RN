import { Image, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../style'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Signup = () => {
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [nameVerify, setNameVerify] = useState(false)
    const [email, setEmail] = useState('')
    const [emailVerify, setEmailVerify] = useState(false)
    const [mobile, setMobile] = useState('')
    const [mobileVerify, setMobileVerify] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    function handleSubmit() {
        const userData = { name, email, mobile, password };

        if (nameVerify && emailVerify && mobileVerify && passwordVerify) {
            axios.post('http://192.168.10.103:3000/signup', userData)
                .then(res => {
                    console.log(res.data);
                    if (res.data === 'success') {
                        Alert.alert('Signup Successful');
                        navigation.navigate('login')
                    } else {
                        Alert.alert(JSON.stringify(res.data));
                    }
                })
                .catch(err => {
                    console.log('Signup error:', err.message);
                    Alert.alert('Signup Failed. Please try again.');
                });
        } else {
            Alert.alert('Please fill all fields');
        }
    };


    const nameHandler = (text) => {
        setName(text);
        if (text.length > 1) {
            setNameVerify(true);
        } else {
            setNameVerify(false);
        }
    };

    const emailHandler = (text) => {
        setEmail(text);
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailCheck.test(text)) {
            setEmailVerify(true);
        } else {
            setEmailVerify(false);
        }
    };


    const mobileHandler = (text) => {
        setMobile(text);
        const mobileRegex = /^[0-9]{10}$/;
        if (mobileRegex.test(text)) {
            setMobileVerify(true);
        } else {
            setMobileVerify(false);
        }
    };

    const passwordHandler = (text) => {
        setPassword(text);
        if (text.length >= 6) {
            setPasswordVerify(true);
        } else {
            setPasswordVerify(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>

            <View style={styles.mainContainer}>
                <View style={styles.loginContainer}>
                    <Image
                        source={require('../../assets/login.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <View>
                        <Text style={styles.text_header}>Sign Up</Text>
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder='Name' style={styles.textInput} onChangeText={nameHandler} />
                        {name.length < 1
                            ? null
                            : nameVerify
                                ? <Feather name='check-circle' color='green' size={20} />
                                : <MaterialIcons name='error' color='red' size={22} />
                        }

                    </View>

                    {name.length < 1 ? null : nameVerify ? null : (<Text style={{ marginLeft: 25, color: 'red' }}>Name should be more than 1 character</Text>)}

                    <View style={styles.action}>
                        <Fontisto name='email' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder='Email' style={styles.textInput} onChangeText={emailHandler} />
                        {email.length < 1
                            ? null
                            : emailVerify
                                ? <Feather name='check-circle' color='green' size={20} />
                                : <MaterialIcons name='error' color='red' size={22} />
                        }
                    </View>

                    {email.length < 1 ? null : emailVerify ? null : (<Text style={{ marginLeft: 25, color: 'red' }}>Enter proper Email Address</Text>)}



                    <View style={styles.action}>
                        <FontAwesome name='mobile' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder='Mobile' style={styles.textInput} onChangeText={mobileHandler} maxLength={10} />
                        {mobile.length < 1
                            ? null
                            : mobileVerify
                                ? <Feather name='check-circle' color='green' size={20} />
                                : <Feather name='x-circle' color='red' size={20} />}
                    </View>

                    {mobile.length < 1 ? null : mobileVerify ? null : (<Text style={{ marginLeft: 25, color: 'red' }}>Phone number must be 10 digits </Text>)}


                    <View style={styles.action}>
                        <FontAwesome name='lock' color='#420475' style={styles.smallIcon} />

                        <TextInput
                            placeholder='Password'
                            style={[styles.textInput, { flex: 1 }]}
                            onChangeText={passwordHandler}
                            secureTextEntry={!showPassword}
                        />

                        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                            {password.length < 1 ? null : !showPassword ? (<Feather
                                name='eye-off'
                                color={passwordVerify ? 'green' : 'red'}
                                size={23}
                                style={{ marginRight: 10 }}
                            />) : (<Feather
                                name='eye'
                                color={passwordVerify ? 'green' : 'red'}
                                size={23}
                                style={{ marginRight: 10 }}
                            />)}

                        </TouchableOpacity>
                    </View>

                    {password.length < 1 ? null : passwordVerify ? null : (<Text style={{ marginLeft: 25, color: 'red' }}>Uppercase, Lowercase, Number & Characters  </Text>)}


                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
                        <View>
                            <Text style={styles.textSign}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView>
    );
}

export default Signup