/**
 * Genera un ID único para formularios.
 * Combina timestamp con string aleatorio para garantizar unicidad.
 */
export const generateFormId = (): string => {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substr(2, 9);
  return `form_${timestamp}_${randomPart}`;
};

/**
 * Valida si un ID tiene el formato correcto
 */
export const isValidFormId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0 && id.startsWith('form_');
};

/**
 * Extrae el timestamp de un ID de formulario
 */
export const getTimestampFromId = (id: string): number | null => {
  try {
    if (!isValidFormId(id)) return null;
    const parts = id.split('_');
    if (parts.length >= 2) {
      return parseInt(parts[1]);
    }
    return null;
  } catch {
    return null;
  }
};
