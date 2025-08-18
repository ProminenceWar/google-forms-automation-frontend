import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFileUpload } from '../hooks/useFileUpload';

export const FilePickerTest: React.FC = () => {
  const { pickPDFDocument, selectedFile } = useFileUpload();

  const handlePress = async () => {
    console.log('Botón presionado - iniciando selección...');
    try {
      const result = await pickPDFDocument();
      console.log('Resultado recibido:', result);

      if (result.success) {
        Alert.alert('Éxito', `Archivo seleccionado: ${result.fileName}`);
      } else {
        Alert.alert('Error', result.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error catch:', error);
      Alert.alert('Error', 'Error inesperado al seleccionar archivo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test DocumentPicker</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Seleccionar PDF</Text>
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>Archivo: {selectedFile.name}</Text>
          <Text style={styles.fileSize}>Tamaño: {selectedFile.size} bytes</Text>
          <Text style={styles.fileType}>Tipo: {selectedFile.type}</Text>
          <Text style={styles.fileUri}>URI: {selectedFile.uri}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fileSize: {
    fontSize: 14,
    marginBottom: 5,
  },
  fileType: {
    fontSize: 14,
    marginBottom: 5,
  },
  fileUri: {
    fontSize: 12,
    color: '#666',
  },
});
