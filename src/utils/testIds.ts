// Archivo de ejemplo para verificar el funcionamiento del sistema de IDs
// Este archivo puede eliminarse después de las pruebas

import {
  generateFormId,
  isValidFormId,
  getTimestampFromId,
} from '../utils/idGenerator';

// Ejemplo de uso del sistema de IDs
export const testIdSystem = () => {
  console.log('=== Prueba del Sistema de IDs ===');

  // Generar algunos IDs
  const id1 = generateFormId();
  const id2 = generateFormId();

  console.log('ID generado 1:', id1);
  console.log('ID generado 2:', id2);

  // Validar IDs
  console.log('¿ID1 es válido?', isValidFormId(id1));
  console.log('¿ID2 es válido?', isValidFormId(id2));
  console.log('¿"invalid" es válido?', isValidFormId('invalid'));

  // Extraer timestamps
  console.log('Timestamp de ID1:', getTimestampFromId(id1));
  console.log('Timestamp de ID2:', getTimestampFromId(id2));

  // Ejemplo de FormData con ID
  const exampleFormData = {
    id: id1,
    email: 'test@example.com',
    numeroOrden: '12345',
    tipoFSO: 'instalaciones',
    companiaInspeccion: 'Compañía Test',
    nombreTecnico: 'Juan Técnico',
    instalacionDireccionCorrecta: true,
    combaFTB: false,
    colocacionGripCorrecta: true,
    alturaDropCorrecta: true,
    puntoApoyoAdecuado: true,
    dropLibreEmpalme: false,
    metrosDrop: '20',
    colocacionGanchosCorrecta: true,
    recorridoDropExteriorAdecuado: true,
    colocacionTestTerminalCorrecta: true,
    jackSuperficieCorrecto: true,
    routerUbicadoCorrectamente: true,
    potenciaCorrecta: '-20dBm',
    puntuacionCliente: '10',
    telefonoCliente: 5551234567,
    nombreCliente: 'Cliente Test',
    comentariosCaso: 'Todo correcto',
  };

  console.log('FormData de ejemplo con ID:', {
    id: exampleFormData.id,
    numeroOrden: exampleFormData.numeroOrden,
    nombreCliente: exampleFormData.nombreCliente,
  });

  console.log('=== Fin de la Prueba ===');
};
