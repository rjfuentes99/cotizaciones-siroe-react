import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet } from "react-native";

const PDFStorageScreen: React.FC = () => {
  const [requests, setRequests] = useState([]); // Datos obtenidos del servidor
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  const fieldLabels = {
    id: "N° Equipamiento",
    equipmentType: "Tipo de Equipo",
    brand: "Marca",
    model: "Modelo",
    serialNumber: "Número de Serie",
    ipAddress: "Dirección IP",
    processor: "Procesador",
    ram: "Memoria RAM",
    storage: "Almacenamiento",
    os: "Sistema Operativo",
    officeSuite: "Suite Ofimática",
    softwareLicenses: "Licencias de Software",
    physicalState: "Estado Físico",
    lastMaintenance: "Último Mantenimiento",
    currentIssues: "Problemas Actuales",
    monitors: "Monitores",
    keyboard: "Teclado",
    mouse: "Ratón",
    otherPeripherals: "Otros Periféricos",
    antivirus: "Antivirus",
    backupSoftware: "Software de Copias de Seguridad",
    lastBackup: "Última Copia de Seguridad",
    securitySoftware: "Software de Seguridad",
    comments: "Comentarios",
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://app-soporte-siroe.vercel.app/levantamientos");
        if (!response.ok) {
          throw new Error(`Error al obtener las solicitudes: ${response.status}`);
        }
        const data = await response.json();
        console.log({data})
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
              

              {item.Equipamientos?.length > 0 ? (
                item.Equipamientos.map((equipamiento, index) => (
                <View key={index} style={styles.equipamientoContainer}>
                  {Object.entries(equipamiento).map(([key, value]) => 
                    key !== "UsuariosAsignados" && value !== null && fieldLabels[key] && (
                      <Text key={key} style={styles.itemText}>
                        <Text style={styles.label}>{fieldLabels[key] || key}:</Text> {String(value)}
                      </Text>
                    )
                  )}

                  {/* Renderizar UsuariosAsignados */}
                  {equipamiento.UsuariosAsignados?.length > 0 && (
                    <View style={styles.usuariosContainer}>
                      <Text style={styles.subTitle}>Usuarios Asignados:</Text>
                      {equipamiento.UsuariosAsignados.map((usuario, userIndex) => (
                        <View key={userIndex} style={styles.usuarioItem}>
                          <Text style={styles.itemText}>
                            <Text style={styles.label}>Nombre:</Text> {usuario.name}
                          </Text>
                          <Text style={styles.itemText}>
                            <Text style={styles.label}>Email:</Text> {usuario.email}
                          </Text>
                          <Text style={styles.itemText}>
                            <Text style={styles.label}>Teléfono:</Text> {usuario.phone}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                </View>
              ))) : (
                <Text style={styles.itemText}>No hay equipamientos disponibles.</Text>
              )}

            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  equipamientoContainer: {
    marginBottom: 10, // Espaciado entre cada contenedor
    padding: 10,      // Espaciado interno
    backgroundColor: "#f9f9f9", // Fondo claro
    borderRadius: 5,  // Bordes redondeados
    borderWidth: 1,   // Bordes visibles
    borderColor: "#ccc", // Color del borde
  },
  usuariosContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e9f7ff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  usuarioItem: {
    marginBottom: 5,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#007bff",
    marginBottom: 5,
  },
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
