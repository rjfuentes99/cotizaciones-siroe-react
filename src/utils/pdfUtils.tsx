import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export const generatePDF = async (
  clientName: string,
  dateTime: string,
  problemType: string,
  problemDescription: string,
  responsible: string,
  additionalNotes: string

) => {
  console.log('fecha:', dateTime);
  const data = {
    clientName,
    dateTime : '10/12/2024',
    problemType,
    problemDescription,
    responsible,
    additionalNotes
  }
  console.log(data);

  try {
      const response = await fetch('https://app-soporte-siroe.vercel.app/ingresar-levantamiento', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
      });

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
          <h1>Reporte de Levantamiento</h1>
          <div class="info">
            <p><strong>Nombre del Cliente:</strong> ${clientName}</p>
            <p><strong>Fecha y Hora:</strong> ${dateTime}</p>
          </div>
          <table>
            <tr><th>Detalle</th><th>Descripción</th></tr>
            <tr><td>Tipo de Problema</td><td>${problemType}</td></tr>
            <tr><td>Descripción del Problema</td><td>${problemDescription}</td></tr>
            <tr><td>Responsable</td><td>${responsible}</td></tr>
            <tr><td>Observaciones</td><td>${additionalNotes}</td></tr>
          </table>
        </div>
      </body>
    </html>
  `;
  const { uri } = await printToFileAsync({ html });
  await shareAsync(uri);
};
