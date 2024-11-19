import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export const generatePDF = async (
  clientName: string,
  department: string,
  phone: string,
  generalInfo: string,
  equipmentType: string,
  brand: string,
  model: string,
  serialNumber: string,
  ipAddress: string,
  assignedUser: string,
  email: string,
  location: string,
  processor: string,
  ram: string,
  storage: string,
  os: string,
  officeSuite: string,
  softwareLicenses: string,
  physicalState: string,
  currentIssues: string,
  monitors: string,
  keyboard: string,
  mouse: string,
  otherPeripherals: string,
  antivirus: string,
  backupSoftware: string,
  securitySoftware: string,
  comments: string
) => {
  const data = {
    clientName,
    department,
    phone,
    generalInfo,
    email,
    location,
  };

  console.log('Datos para PDF:', data);
  let clienteId;
  try {
    const response = await fetch('https://app-soporte-siroe.vercel.app/ingresar-levantamiento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const serverResponse = await response.json();
    clienteId = serverResponse.id;
    console.log('Server Response:', serverResponse);
    console.log('clienteId:', clienteId);
    console.log('Respuesta del servidor:', serverResponse);
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }

  const data2 = {
    clienteId,
    equipmentType,
    brand,
    model,
    serialNumber,
    ipAddress,
    assignedUser,
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
    comments,
  }

  try{
    const response = await fetch ('https://app-soporte-siroe.vercel.app/ingresar-equipamiento',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data2),
    })
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
 
    const serverResponse = await response.json();
    console.log('Respuesta del servidor:', serverResponse);
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }


  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; line-height: 1.6; }
          .container { width: 90%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          h1 { text-align: center; color: #333; }
          .info { margin: 20px 0; padding: 10px; border-bottom: 1px solid #ccc; }
          .info p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reporte de Equipo</h1>
          <div class="info">
            <p><strong>Cliente / Empresa:</strong> ${clientName}</p>
            <p><strong>Área / Departamento:</strong> ${department}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Información General del Equipo:</strong> ${generalInfo}</p>
          </div>
          <table>
            <tr><th>Detalle</th><th>Descripción</th></tr>
            <tr><td>Tipo de Equipo</td><td>${equipmentType}</td></tr>
            <tr><td>Marca</td><td>${brand}</td></tr>
            <tr><td>Modelo</td><td>${model}</td></tr>
            <tr><td>Número de Serie</td><td>${serialNumber}</td></tr>
            <tr><td>Dirección IP</td><td>${ipAddress}</td></tr>
            <tr><td>Usuario Asignado</td><td>${assignedUser}</td></tr>
            <tr><td>Email</td><td>${email}</td></tr>
            <tr><td>Ubicación Física</td><td>${location}</td></tr>
            <tr><td>Procesador</td><td>${processor}</td></tr>
            <tr><td>Memoria RAM</td><td>${ram}</td></tr>
            <tr><td>Almacenamiento</td><td>${storage}</td></tr>
            <tr><td>Sistema Operativo</td><td>${os}</td></tr>
            <tr><td>Ofimática</td><td>${officeSuite}</td></tr>
            <tr><td>Licencias de Software</td><td>${softwareLicenses}</td></tr>
            <tr><td>Estado Físico</td><td>${physicalState}</td></tr>
            <tr><td>Problemas / Fallas Actuales</td><td>${currentIssues}</td></tr>
            <tr><td>Monitor(es)</td><td>${monitors}</td></tr>
            <tr><td>Teclado</td><td>${keyboard}</td></tr>
            <tr><td>Mouse</td><td>${mouse}</td></tr>
            <tr><td>Otros Periféricos</td><td>${otherPeripherals}</td></tr>
            <tr><td>Antivirus</td><td>${antivirus}</td></tr>
            <tr><td>Software de Respaldo</td><td>${backupSoftware}</td></tr>

            <tr><td>Software de Seguridad</td><td>${securitySoftware}</td></tr>
            <tr><td>Comentarios</td><td>${comments}</td></tr>
          </table>
        </div>
      </body>
    </html>
  `;

  const { uri } = await printToFileAsync({ html });
  await shareAsync(uri);
};
