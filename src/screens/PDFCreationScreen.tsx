import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { generatePDF } from '../utils/pdfUtils';

export default function PDFCreationScreen() {
    const [clientName, setClientName] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [problemType, setProblemType] = useState('Hardware');
    const [problemDescription, setProblemDescription] = useState('');
    const [responsible, setResponsible] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    // Campos del formulario
    const handleGeneratePDF = () => {
      const formattedDateTime = dateTime.toISOString(); // Formato compatible con SQL
      generatePDF(client, department, phone, generalInfo, equipmentType, brand, model, serialNumber, ipAddress, assignedUser, email, location, processor, ram, storage, os, officeSuite, softwareLicenses, physicalState,
         currentIssues, monitors, keyboard, mouse, otherPeripherals, antivirus, backupSoftware, securitySoftware, comments 
      );
    };
    const [client, setClient] = useState('');
    const [department, setDepartment] = useState('');
    const [phone, setPhone] = useState('');
    const [generalInfo, setGeneralInfo] = useState('');
    const [equipmentType, setEquipmentType] = useState('Desktop');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [processor, setProcessor] = useState('');
    const [ram, setRam] = useState('');
    const [storage, setStorage] = useState('');
    const [os, setOs] = useState('');
    const [officeSuite, setOfficeSuite] = useState('');
    const [softwareLicenses, setSoftwareLicenses] = useState('');
    const [physicalState, setPhysicalState] = useState('');
    const [lastMaintenance, setLastMaintenance] = useState(new Date());
    const [currentIssues, setCurrentIssues] = useState('');
    const [monitors, setMonitors] = useState('');
    const [keyboard, setKeyboard] = useState('');
    const [mouse, setMouse] = useState('');
    const [otherPeripherals, setOtherPeripherals] = useState('');
    const [antivirus, setAntivirus] = useState('');
    const [backupSoftware, setBackupSoftware] = useState('');
    const [lastBackup, setLastBackup] = useState(new Date());
    const [securitySoftware, setSecuritySoftware] = useState('');
    const [comments, setComments] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateTime(selectedDate);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Cliente / Empresa" style={styles.textInput} value={client} onChangeText={setClient} />
      <TextInput placeholder="Nombre del Área/Departamento" style={styles.textInput} value={department} onChangeText={setDepartment} />
      <TextInput placeholder="Teléfono" style={styles.textInput} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Información General del Equipo" style={styles.textArea} value={generalInfo} onChangeText={setGeneralInfo} />
      <Picker selectedValue={equipmentType} style={styles.picker} onValueChange={setEquipmentType}>
        <Picker.Item label="Desktop" value="Desktop" />
        <Picker.Item label="Notebook" value="Notebook" />
        <Picker.Item label="Servidor" value="Servidor" />
        <Picker.Item label="Celular" value="Celular" />
        <Picker.Item label="Tablet" value="Tablet" />
        <Picker.Item label="Otros" value="Otros" />

      </Picker>
      <TextInput placeholder="Marca" style={styles.textInput} value={brand} onChangeText={setBrand} />
      <TextInput placeholder="Modelo" style={styles.textInput} value={model} onChangeText={setModel} />
      <TextInput placeholder="Número de Serie" style={styles.textInput} value={serialNumber} onChangeText={setSerialNumber} />
      <TextInput placeholder="Dirección IP" style={styles.textInput} value={ipAddress} onChangeText={setIpAddress} />
      <TextInput placeholder="Usuario Asignado" style={styles.textInput} value={assignedUser} onChangeText={setAssignedUser} />
      <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Ubicación Física" style={styles.textInput} value={location} onChangeText={setLocation} />
      <TextInput placeholder="Procesador" style={styles.textInput} value={processor} onChangeText={setProcessor} />
      <TextInput placeholder="Memoria RAM" style={styles.textInput} value={ram} onChangeText={setRam} />
      <TextInput placeholder="Almacenamiento" style={styles.textInput} value={storage} onChangeText={setStorage} />
      <TextInput placeholder="Sistema Operativo Instalado" style={styles.textInput} value={os} onChangeText={setOs} />
      <TextInput placeholder="Ofimática Instalado" style={styles.textInput} value={officeSuite} onChangeText={setOfficeSuite} />
      <TextInput placeholder="Licencias de Software" style={styles.textInput} value={softwareLicenses} onChangeText={setSoftwareLicenses} />
      <TextInput placeholder="Estado Físico" style={styles.textInput} value={physicalState} onChangeText={setPhysicalState} />
      <TextInput
        placeholder="Problemas o Fallas Actuales"
        style={styles.textArea}
        value={currentIssues}
        onChangeText={setCurrentIssues}
      />
      <TextInput placeholder="Monitor(es)" style={styles.textInput} value={monitors} onChangeText={setMonitors} />
      <TextInput placeholder="Teclado" style={styles.textInput} value={keyboard} onChangeText={setKeyboard} />
      <TextInput placeholder="Mouse" style={styles.textInput} value={mouse} onChangeText={setMouse} />
      <TextInput
        placeholder="Otros Periféricos (especificar)"
        style={styles.textInput}
        value={otherPeripherals}
        onChangeText={setOtherPeripherals}
      />
      <TextInput placeholder="Antivirus Instalado" style={styles.textInput} value={antivirus} onChangeText={setAntivirus} />
      <TextInput placeholder="Software de Respaldo" style={styles.textInput} value={backupSoftware} onChangeText={setBackupSoftware} />
      <TextInput
        placeholder="Software de Seguridad Adicional"
        style={styles.textInput}
        value={securitySoftware}
        onChangeText={setSecuritySoftware}
      />
      <TextInput placeholder="Comentarios o notas adicionales" style={styles.textArea} value={comments} onChangeText={setComments} />
      <Button title="Generar Reporte" onPress={handleGeneratePDF} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  textInput: { marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 },
  textArea: { marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, height: 80 },
  picker: { marginVertical: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
});
