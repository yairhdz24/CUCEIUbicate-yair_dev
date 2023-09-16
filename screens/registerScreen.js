import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
//import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native'; // Importa LottieView

  const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const allowedDomains = ['alumnos.udg.mx', 'gmail.com', 'hotmail.com', 'outlook.com'];
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; //debe complirse el regex para poder ser aceptado en el registro
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; //Regex de 8 caracteres minimos y una letra mayuscula onbligatortia

  const navigation = useNavigation();

  const handleRegister = () => {
    setEmailError(false);
    setPasswordError(false);
    setErrorMsg('');

    if (!email || !password || !confirmPassword) {
      setEmailError(true);
      setPasswordError(true);
      setErrorMsg('Por favor, completa todos los campos');
      return;
    }

    if (!emailRegex.test(email) || !allowedDomains.includes(email.split('@')[1])) {
      setEmailError(true);
      setErrorMsg('Correo electrónico no válido');
      return;
    }

  //  if (!passwordRegex.test(password)) {
    //  setPasswordError(true);
  
    //  setErrorMsg('La contraseña debe tener al menos 8 caracteres, incluyendo al menos 1 número y 1 letra mayúscula.');
    //  return;
  //  }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setErrorMsg('Las contraseñas no coinciden');
      return;
    }
    
    // Redirigir a la pantalla de completar perfil si todas las validaciones son exitosas
    navigation.navigate('Completar Perfil');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.successText}>Registra tu cuenta</Text>
      {/* <View style = {styles.iconCircle}> */}

      <LottieView
      source={require('../assets/animations/register.json')} 
      autoPlay
      loop = {true}
      style={{width: 300, height: 300}}
    />


      {/* <Icon name="user-plus" size={60} color="#0b34b0" style={styles.icon} /> */}
      {/* </View> */}
      <View style={styles.loginBox}>
        <View>
          <Text style={[styles.label, emailError && { color: 'red' }]}>Correo Electrónico:</Text>
          <TextInput
            style={[styles.input, emailError && { borderColor: 'red' }]}
            placeholder="alumno@cucei.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />

          <Text style={[styles.label, passwordError && { color: 'red' }]}>Contraseña:</Text>
          <View style={[styles.passwordInputContainer, passwordError && { borderColor: 'red' }]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Ingresa tu contraseña"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={19}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, passwordError && { color: 'red' }]}>Confirmar Contraseña:</Text>
          <TextInput
            style={[styles.input, passwordError && { borderColor: 'red' }]}
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <TouchableOpacity style={styles.customButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4EDF9',
  },
  loginBox: {
    width: '80%',
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    
  },

  iconCircle: {
    backgroundColor: 'white',
    borderRadius: 60,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },

  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  passwordToggle: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 15
  },
  customButton: {
    marginTop: 15,
    backgroundColor: '#0b34b0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
});

export default RegisterScreen;
