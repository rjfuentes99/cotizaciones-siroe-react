import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet } from "react-native";

const PDFStorageScreen: React.FC = () => {
  const [requests, setRequests] = useState([]); // Datos obtenidos del servidor
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  // Cargar datos al montar el componente
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://app-soporte-siroe.vercel.app/levantamientos");
        if (!response.ok) {
          throw new Error(`Error al obtener las solicitudes: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data); // Asignar los datos obtenidos
      } catch (error) {
        console.error("Error al cargar las solicitudes:", error);
      } finally {
        setLoading(false); // Desactivar el indicador de carga
      }
    };

    fetchRequests();
  }, []);

  // Filtrar los datos basados en el término de búsqueda
  const filteredRequests = requests.filter((request) =>
    request.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almacenamiento de PDFs</Text>
      <TextInput
        placeholder="Buscar por cliente"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={styles.input}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loaderText}>Cargando datos...</Text>
        </View>
      ) : filteredRequests.length === 0 ? (
        <Text style={styles.message}>No se encontraron resultados.</Text>
      ) : (
        <FlatList
          data={filteredRequests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Cliente:</Text> {item.clientName}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Departamento:</Text> {item.department}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Telefono:</Text> {item.phone}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Descripción:</Text> {item.generalInfo}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Email:</Text> {item.email}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Ubicacion:</Text> {item.location}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

export default PDFStorageScreen;
