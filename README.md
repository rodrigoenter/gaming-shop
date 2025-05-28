# 🎮 Gaming Shop  

![Gaming Shop Banner](https://iili.io/3QeOozu.png)

Aplicación móvil desarrollada en **React Native (Expo)** para el curso "Desarrollo de Aplicaciones" de Coderhouse. Simula una tienda de videojuegos físicos con funcionalidades claves de e-commerce.

## 📋 Descripción del proyecto
Su objetivo es ofrecer una experiencia moderna y sencilla para comprar videojuegos de distintas consolas, mientras se aplican los conceptos del curso.

## 🕸️ Wireframes
[Prototipo interactivo en Figma](https://www.figma.com/design/IjgAMDvEcvd9z6oWwgcKtK/Wireframes-app-GamingShop?node-id=0-1&m=dev&t=IzYnWtOZWM4bO4hj-1)

## 🤳 Descargar apk
[Apk desarrollada para su prueba](https://expo.dev/artifacts/eas/oqt8p6RYMAeFb6GmCUS6gE.apk)
[Descarga alternativa](https://drive.google.com/file/d/15DMh7km2c5BmKn4LazkNZpUMt5m_XhkY/view?usp=sharing)

## 🎯 Objetivos académicos

### 1. Configurar arquitectura base  
- Implementar estructura inicial con **Expo**  
- Organizar proyecto en módulos: `assets`, `components`, `services`, `slices`, `screens`
- Diseñar sistema de navegación  

### 2. Gestionar estado de la aplicación  
- Utilizar **Redux Toolkit** para:  
  - Control global del carrito de compras  
  - Administración de favoritos, órdenes y sesión de usuario  
- Implementar persistencia offline con **SQLite**  

### 3. Integrar Firebase  
- Autenticación con Email/Contraseña
- Sincronización en tiempo real de productos y pedidos

### 4. Implementar interfaces nativas
- Módulo de cámara (expo-image-picker):

- Localización

- Acceso a galería del dispositivo (expo-media-library)

### 5. Optimizar rendimiento
- Renderizado

- Carga diferida de imágenes

### 6. Documentar el proyecto
- Elaborar README.md con:

  - Diagrama de flujo de datos

  - Guía de instalación detallada

## 🛠 Tecnologías principales

### Core Dependencies
| Librería                      | Versión   | Propósito                                                                |
|-------------------------------|-----------|--------------------------------------------------------------------------|
| React Navigation              | 7.x       | Sistema combinado Stack + Bottom Tabs + Drawer                           |
| Redux Toolkit                 | 2.7.0     | Gestión global del estado (carrito, usuario)                             |
| Expo SQLite                   | 15.1.4    | Almacenamiento local offline                                             |
| React Native Maps             | 1.18.0    | Mapa interactivo                                                         |
| Yup                           | 1.6.1     | Validación de formularios complejos                                      |
| expo-image-picker             | 16.0.6    | Captura de imágenes para perfil de usuario                               |
| react-native-toast-message    | 2.3.0     | Sistema de notificaciones visuales                                       |

### Herramientas
![Figma](https://img.shields.io/badge/Figma-Diseño_de_prototipo-red)
![Android Studio](https://img.shields.io/badge/Android_Studio-Emulación-green)
![Expo EAS](https://img.shields.io/badge/Expo_EAS-Build_APK-blue)
![Adobe Illustrator](https://img.shields.io/badge/Adobe_Illustrator-Identidad_de_marca-orange)

## 🌟 Features destacados

### Experiencia de usuario
- ☯️ Estructura equilibrada y jerarquizada
- 🏞️ Estética moderna y fluída
- ⌛ Indicadores de estados de carga
- 🔔 Notificaciones de acciones de usuario
- ⁉️ Manejo de errores puntuales y alertas pertinentes
- 🔄 Sincronización offline de datos

### Gestión de datos
- 🔐 Autenticación con validación Yup
- 📲 Sync automático al recuperar conexión
- 🛒 Persistencia de carrito con Redux Persist
- 📊 Dashboard administrativo (solo modo desarrollo)

## Features integrados en la APK
✅ **Funcionalidades nativas incluidas:**
| Módulo       | Librería            | Uso en APK                                  |
|--------------|---------------------|---------------------------------------------|
| Geolocalización | `expo-location`   | Mapa + navegación |
| Cámara       | `expo-image-picker` | Captura de avatar de usuario      |
| Galería      | `expo-media-library`| Visualización de imágenes locales      |
| Compartir    | `expo-sharing`      | Compartir juegos via redes sociales/APPs    |

## 🚀 Instalación

**Requisitos:**
- Node.js v18+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio/iOS Simulator

```bash
# 1. Clonar repositorio
git clone https://github.com/rodrigoenter/gaming-shop.git

# 2. Instalar dependencias
cd gaming-shop
npm install

# 3. Configurar variables de entorno
"GOOGLE_MAPS_API_KEY=tu_clave_aqui" >
"FIREBASE_WEB_API_KEY=tu_clave_aqui"
Reenplazar en .env.example por .env solamente

# 4. Iniciar proyecto
npx expo start
```

## 📚 Documentación
[React Native Docs](https://reactnative.dev)

[React Navigation Guide](https://reactnavigation.org)

[Expo Documentation](https://docs.expo.dev)

## 📌 Nota importante
⚠ Proyecto académico sin fines comerciales

🚫 No maneja datos sensibles/pagos reales

## 👦🏻💻 Autor
[Rodrigo Enter](https://github.com/rodrigoenter) - Diseñador gráfico/Ux-Ui