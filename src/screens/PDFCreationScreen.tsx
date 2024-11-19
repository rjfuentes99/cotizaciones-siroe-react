import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { generatePDF } from '../utils/pdfUtils';

export default function PDFCreationScreen() {
  const [equipmentType, setEquipmentType] = useState('Desktop');
  const [client, setClient] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [generalInfo, setGeneralInfo] = useState('');
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
  const [currentIssues, setCurrentIssues] = useState('');
  const [monitors, setMonitors] = useState('');
  const [keyboard, setKeyboard] = useState('');
  const [mouse, setMouse] = useState('');
  const [otherPeripherals, setOtherPeripherals] = useState('');
  const [antivirus, setAntivirus] = useState('');
  const [backupSoftware, setBackupSoftware] = useState('');
  const [securitySoftware, setSecuritySoftware] = useState('');
  const [comments, setComments] = useState('');

  const visibleFields = {
    Desktop: ['brand', 'model', 'processor', 'ram', 'storage', 'ipAddress', 'os', 'officeSuite', 'softwareLicenses'],
    Notebook: ['brand', 'model', 'serialNumber', 'ram', 'storage', 'os', 'officeSuite'],
    Servidor: ['brand', 'model', 'processor', 'ram', 'storage', 'serialNumber', 'ipAddress', 'os', 'softwareLicenses'],
    Celular: ['brand', 'model', 'serialNumber', 'storage', 'os'],
    Tablet: ['brand', 'model', 'serialNumber', 'storage', 'os'],
    Otros: ['brand', 'model', 'serialNumber'],
  };

  const handleGeneratePDF = () => {
    generatePDF(
      client,
      department,
      phone,
      generalInfo,
      equipmentType,
      brand,
      model,
      serialNumber,
      ipAddress,
      assignedUser,
      email,
      location,
      processor,
      ram,
      storage,
      os,
      officeSuite,
      softwareLicenses,
      physicalState,
      currentIssues,
      monitors,
      keyboard,
      mouse,
      otherPeripherals,
      antivirus,
      backupSoftware,
      securitySoftware,
      comments
    );
  };

  const isFieldVisible = (field: string) => visibleFields[equipmentType]?.includes(field);

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Cliente / Empresa" style={styles.textInput} value={client} onChangeText={setClient} />
      <TextInput placeholder="Nombre del Área/Departamento" style={styles.textInput} value={department} onChangeText={setDepartment} />
      <TextInput placeholder="Teléfono" style={styles.textInput} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Información General del Equipo" style={styles.textArea} value={generalInfo} onChangeText={setGeneralInfo} />
      <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Picker selectedValue={equipmentType} style={styles.picker} onValueChange={setEquipmentType}>
        {Object.keys(visibleFields).map((key) => (
          <Picker.Item label={key} value={key} key={key} />
        ))}
      </Picker>
      {isFieldVisible('brand') && <TextInput placeholder="Marca" style={styles.textInput} value={brand} onChangeText={setBrand} />}
      {isFieldVisible('model') && <TextInput placeholder="Modelo" style={styles.textInput} value={model} onChangeText={setModel} />}
      {isFieldVisible('serialNumber') && (
        <TextInput placeholder="Número de Serie" style={styles.textInput} value={serialNumber} onChangeText={setSerialNumber} />
      )}
      {isFieldVisible('processor') && (
        <TextInput placeholder="Procesador" style={styles.textInput} value={processor} onChangeText={setProcessor} />
      )}
      {isFieldVisible('ram') && <TextInput placeholder="Memoria RAM" style={styles.textInput} value={ram} onChangeText={setRam} keyboardType="numeric" />}
      {isFieldVisible('storage') && <TextInput placeholder="Almacenamiento" style={styles.textInput} value={storage} onChangeText={setStorage} />}
      {isFieldVisible('ipAddress') && (
        <TextInput placeholder="Dirección IP" style={styles.textInput} value={ipAddress} onChangeText={setIpAddress} />
      )}
      {isFieldVisible('os') && <TextInput placeholder="Sistema Operativo Instalado" style={styles.textInput} value={os} onChangeText={setOs} />}
      {isFieldVisible('officeSuite') && (
        <TextInput placeholder="Ofimática Instalado" style={styles.textInput} value={officeSuite} onChangeText={setOfficeSuite} />
      )}
      {isFieldVisible('softwareLicenses') && (
        <TextInput
          placeholder="Licencias de Software"
          style={styles.textInput}
          value={softwareLicenses}
          onChangeText={setSoftwareLicenses}
        />
      )}
      
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
