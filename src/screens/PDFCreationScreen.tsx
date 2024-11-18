import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { generatePDF } from '../utils/pdfUtils';

export default function PDFCreationScreen() {
  const [clientName, setClientName] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [problemType, setProblemType] = useState('Hardware');
  const [problemDescription, setProblemDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleDateConfirm = (selectedDate) => {
    setDateTime(selectedDate);
    setDatePickerVisibility(false);
  };

  const handleGeneratePDF = () => {
    const formattedDateTime = dateTime.toISOString(); // Formato compatible con SQL
    generatePDF(clientName, formattedDateTime, problemType, problemDescription, responsible, additionalNotes);
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
        value={dateTime.toLocaleString()} // Muestra una fecha legible
        placeholder="Fecha y Hora del Levantamiento"
        style={styles.textInput}
        onFocus={() => setDatePickerVisibility(true)} // Abre el selector al hacer foco
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={dateTime}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
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
