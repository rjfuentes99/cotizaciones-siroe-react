import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { generatePDF } from '../utils/pdfUtils';

export default function PDFCreationScreen() {
  const [clientName, setClientName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [problemType, setProblemType] = useState('Hardware');
  const [problemDescription, setProblemDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleGeneratePDF = () => {
    generatePDF(clientName, dateTime, problemType, problemDescription, responsible, additionalNotes);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        value={clientName}
        placeholder="Nombre del Cliente"
        style={styles.textInput}
        onChangeText={(value) => setClientName(value)}
      />
      <TextInput
        value={dateTime}
        placeholder="Fecha y Hora del Levantamiento"
        style={styles.textInput}
        onChangeText={(value) => setDateTime(value)}
      />
      <Picker
        selectedValue={problemType}
        style={styles.picker}
        onValueChange={(itemValue) => setProblemType(itemValue)}
      >
        <Picker.Item label="Hardware" value="Hardware" />
        <Picker.Item label="Software" value="Software" />
        <Picker.Item label="Redes" value="Redes" />
      </Picker>
      <TextInput
        value={problemDescription}
        placeholder="Descripción del Problema"
        style={styles.textArea}
        onChangeText={(value) => setProblemDescription(value)}
        multiline
      />
      <TextInput
        value={responsible}
        placeholder="Responsable (técnico)"
        style={styles.textInput}
        onChangeText={(value) => setResponsible(value)}
      />
      <TextInput
        value={additionalNotes}
        placeholder="Observaciones Adicionales"
        style={styles.textArea}
        onChangeText={(value) => setAdditionalNotes(value)}
        multiline
      />
      <Button title="Generar PDF" onPress={handleGeneratePDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  textInput: { marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 },
  textArea: { marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, height: 80 },
  picker: { marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
});
