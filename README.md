# Google Forms Automation Frontend

Una aplicación móvil moderna en React Native para automatizar formularios de Google Forms. La aplicación presenta una interfaz elegante con paleta de colores en blanco, negro y azul, diseñada para ser profesional, funcional y fácil de usar.

## 🚀 Características

- **Interfaz moderna**: Diseño limpio y profesional con componentes UI modernos
- **Validación completa**: Validación en tiempo real de todos los campos obligatorios
- **Campos dinámicos**: Soporte para campos de texto, número, email, teléfono y toggles Sí/No
- **Manejo de errores**: Mensajes claros de error y éxito
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Buenas prácticas**: Hooks personalizados, componentes funcionales y TypeScript

## 🎨 Paleta de Colores

- **Fondo**: Blanco (#FFFFFF)
- **Texto principal**: Negro (#000000)
- **Acentos y botones**: Azul (#007AFF)
- **Estados**: Verde para éxito, Rojo para errores

## 📋 Campos del Formulario

### Campos Obligatorios
- Nombre completo
- Correo electrónico
- Teléfono
- Empresa
- Cargo
- Años de experiencia
- Aceptación de términos y condiciones

### Campos Sí/No (Toggles)
- ¿Tiene experiencia previa en el área?
- ¿Disponible para comenzar inmediatamente?
- ¿Acepta trabajo remoto?
- ¿Desea recibir notificaciones?
- Acepto términos y condiciones (obligatorio)

## 🛠️ Tecnologías Utilizadas

- React Native 0.81.0
- TypeScript
- React Hooks (useState, useCallback)
- SafeAreaProvider para manejo de áreas seguras
- Validación personalizada
- API REST para comunicación con backend

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Button.tsx       # Botón personalizado
│   ├── FormField.tsx    # Campo de formulario
│   ├── ToggleField.tsx  # Campo toggle/switch
│   ├── LoadingSpinner.tsx # Indicador de carga
│   ├── MessageBanner.tsx # Banner de mensajes
│   └── index.ts         # Exportaciones
├── hooks/               # Hooks personalizados
│   └── useForm.ts       # Hook para manejo del formulario
├── screens/             # Pantallas de la aplicación
│   └── FormScreen.tsx   # Pantalla principal del formulario
├── types/               # Definiciones de TypeScript
│   └── index.ts         # Tipos de datos
└── utils/               # Utilidades
    ├── constants.ts     # Constantes y configuración
    ├── validation.ts    # Lógica de validación
    ├── api.ts          # Comunicación con API
    └── index.ts        # Exportaciones
```

## 🚀 Instalación y Configuración

### Prerrequisitos

Asegúrate de tener configurado tu entorno de desarrollo React Native siguiendo la [guía oficial](https://reactnative.dev/docs/set-up-your-environment).

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/ProminenceWar/google-forms-automation-frontend.git
   cd google-forms-automation-frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura el backend** (opcional)
   
   Edita el archivo `src/utils/constants.ts` y actualiza la URL del backend:
   ```typescript
   export const API_CONFIG = {
     BASE_URL: 'https://tu-backend-url.com/api', // Reemplazar con la URL real
     // ...
   };
   ```

4. **Para iOS (solo macOS)**
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Ejecución

1. **Inicia Metro (en una terminal)**
   ```bash
   npm start
   ```

2. **Ejecuta la aplicación (en otra terminal)**

   **Para Android:**
   ```bash
   npm run android
   ```

   **Para iOS:**
   ```bash
   npm run ios
   ```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar linter
npm run lint
```

## 📱 Uso de la Aplicación

1. **Completa los campos obligatorios**: La aplicación validará automáticamente cada campo
2. **Configura las preferencias**: Usa los toggles para responder las preguntas Sí/No
3. **Acepta términos**: Requerido para habilitar el envío
4. **Envía el formulario**: El botón se habilitará solo cuando todos los campos sean válidos
5. **Revisa el resultado**: Verás un mensaje de éxito o error después del envío

## 🔧 Personalización

### Modificar colores
Edita `src/utils/constants.ts` en la sección `Colors`:

```typescript
export const Colors = {
  primary: '#007AFF',     // Color principal (azul)
  secondary: '#000000',   // Color secundario (negro)
  background: '#FFFFFF',  // Fondo (blanco)
  // ...
};
```

### Agregar nuevos campos
1. Actualiza el tipo `FormData` en `src/types/index.ts`
2. Modifica la validación en `src/utils/validation.ts`
3. Agrega el campo en `src/screens/FormScreen.tsx`

### Cambiar endpoint del backend
Edita `API_CONFIG.BASE_URL` en `src/utils/constants.ts`

## 🌟 Características Técnicas

- **Validación en tiempo real**: Los errores se muestran mientras el usuario escribe
- **Botón inteligente**: Se deshabilita automáticamente si el formulario no es válido
- **Manejo de estado robusto**: Hook personalizado para gestión completa del formulario
- **Componentes reutilizables**: Arquitectura modular para fácil mantenimiento
- **TypeScript**: Tipado fuerte para mayor seguridad y desarrollo
- **Responsive**: Diseño adaptable con KeyboardAvoidingView

## 🐛 Solución de Problemas

### Error de Metro/Bundler
```bash
npx react-native start --reset-cache
```

### Problemas con iOS
```bash
cd ios && bundle exec pod install
```

### Errores de compilación Android
```bash
cd android && ./gradlew clean
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Frontend**: Implementación React Native
- **Diseño UI/UX**: Paleta de colores y experiencia de usuario
- **Backend Integration**: API REST y manejo de datos

---

⚡ **¡Listo para usar!** Esta aplicación está completamente funcional y lista para conectarse con tu backend de Google Forms automation.