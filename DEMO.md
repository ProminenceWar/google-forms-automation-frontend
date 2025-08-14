# App Screenshots and Demo

## 📱 Vista Principal del Formulario

La aplicación presenta una interfaz limpia y profesional con los siguientes elementos:

### Secciones del Formulario:

1. **Header**
   - Título: "Formulario de Registro"
   - Subtitle explicativo

2. **Información Personal**
   - Nombre completo (requerido)
   - Correo electrónico (requerido) 
   - Teléfono (requerido)

3. **Información Profesional**
   - Empresa (requerido)
   - Cargo (requerido)
   - Años de experiencia (requerido)

4. **Preferencias (Toggles Sí/No)**
   - ¿Tiene experiencia previa en el área?
   - ¿Disponible para comenzar inmediatamente?
   - ¿Acepta trabajo remoto?
   - ¿Desea recibir notificaciones?
   - Acepto términos y condiciones (requerido)

5. **Botón de Envío**
   - Se habilita solo cuando todos los campos obligatorios son válidos
   - Muestra spinner de carga durante el envío
   - Cambia de color según el estado (azul activo, gris deshabilitado)

## 🎨 Esquema de Colores Implementado

- **Fondo**: Blanco puro (#FFFFFF)
- **Texto principal**: Negro (#000000) 
- **Botones y acentos**: Azul iOS (#007AFF)
- **Campos de entrada**: Bordes grises suaves (#E5E5E7)
- **Estados de error**: Rojo (#FF3B30)
- **Estados de éxito**: Verde (#34C759)

## ⚡ Funcionalidades Implementadas

✅ Validación en tiempo real de todos los campos
✅ Mensajes de error específicos para cada campo
✅ Toggles personalizados para campos Sí/No
✅ Botón inteligente que se deshabilita automáticamente
✅ Indicador de carga durante el envío
✅ Mensajes de éxito/error después del envío
✅ Diseño responsive con KeyboardAvoidingView
✅ Scroll suave en toda la pantalla
✅ SafeArea para dispositivos con notch
✅ Placeholders descriptivos en todos los campos

## 🔧 Estructura Técnica

El formulario utiliza un hook personalizado `useForm` que maneja:
- Estado del formulario
- Validación en tiempo real
- Envío al backend
- Manejo de errores y estados de carga

Los componentes son completamente reutilizables y seguir las mejores prácticas de React Native con TypeScript.