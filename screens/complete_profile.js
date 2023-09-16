import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // Importa LottieView


const CompleteProfileScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const careerOptions = [

    "Ingeniería Biomédica INBI",
    "Ingeniería Civil ICIV",
    "Ingeniería en Alimentos y Biotecnología LIAB/LINA",
    "Ingeniería en Comunicaciones y Electrónica INCE",
    "Ingeniería en Computación INCO",
    "Ingeniería en Informática INFO",
    "Ingeniería Fotónica IGFO",
    "Ingeniería Industrial INDU",
    "Ingeniería Mecánica Eléctrica INME",
    "Ingeniería Química INQU",
    "Ingeniería en Logística y Transporte LOGT",
    "Ingeniería en Topografía Geomática ITOG",
    "Licenciatura en Ciencia de Materiales LCMA",
    "Licenciatura en Física LIFI",
    "Licenciatura en Matemáticas LIMA",
    "Licenciatura en Química LQUI",
    "Licenciatura en Químico Farmacéutico Biólogo LQFB",
  ];

  const handleCompleteProfile = () => {
    // Por ahora, solo marcamos el perfil como completo
    setIsProfileComplete(true);
    
  };

  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  return (
    <View style={styles.container}>
      
      <LottieView
        source={require('../assets//animations/Confetti-2.json')} 
        autoPlay
        loop = {true}
        style={{width: 500, height: 300}}
        />
        
      {isProfileComplete ? (
        <>
        
        <Image source={require('../assets/Cucei-1.png')} style={styles.logo} />
        <Text style={styles.profileCompleteText}>Perfil completado. ¡Bienvenido, {username}!</Text>
        </>
        ) : (
      
        
        <View style={styles.profileBox}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Text style={styles.label}>Apellidos:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tus apellidos"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Text style={styles.label}>Nombre de Usuario:</Text>
          <TextInput
            style={styles.input}
            placeholder="@CUCEI_777"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <Text style={styles.label}>Carrera:</Text>
          <TouchableOpacity
            style={styles.picker}
            onPress={toggleModal}
          >
            <Text>{selectedCareer || 'Seleccione una carrera'}</Text>
          </TouchableOpacity>
          
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Seleccione una carrera</Text>
              <ScrollView style={styles.careerOptionsContainer}>
                {careerOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.careerOption}
                    onPress={() => {
                      setSelectedCareer(option);
                      toggleModal();
                    }}
                  >
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCompleteProfile}
          >
            <Text style={styles.buttonText}>Terminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4EDF9', // Color de fondo
  },
  profileBox: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

  picker: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 12,
  },

  profileCompleteText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#0b34b0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  careerOptionsContainer: {
    maxHeight: '60%', // Ajusta el valor según sea necesario
    padding: 20,
    backgroundColor: '#E4EDF9',
    borderRadius: 10,
  },
  careerOption: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 15,
    marginVertical: 8, // Ajusta el margen vertical para separar las opciones
  },
  closeButton: {
    backgroundColor: '#0b34b0',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },

  logo: {
    width: 300,
    height: 300

  }
});

export default CompleteProfileScreen;
