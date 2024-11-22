# Solidarity Nest - BackendProjectFundation

Solidarity Nest es una aplicación diseñada para facilitar la gestión del apadrinamiento y la adopción de animales, con planes futuros para integrar módulos de donaciones y gamificación. Esta última característica busca mejorar la experiencia del usuario e incentivar la tenencia responsable mediante estrategias interactivas.

---

## 🚀 **Descripción General**
Solidarity Nest permite a las fundaciones gestionar de manera eficiente los procesos de:
- **Apadrinamiento:** Crear y gestionar padrinos para animales específicos.
- **Adopciones:** Mostrar un catálogo de animales disponibles para encontrarles un hogar.
  
### **Futuras características**  
- **Gestión de donaciones:** Optimizar la recepción y control de contribuciones económicas.
- **Gamificación:** Ofrecer una experiencia interactiva para motivar y fidelizar a los padrinos.

---

## 🛠️ **Tecnologías utilizadas**
- **Node.js:** Entorno de ejecución para JavaScript.
- **Express.js:** Framework para la creación de APIs RESTful.
- **Sequelize:** ORM para interactuar con la base de datos MySQL.
- **MySQL:** Base de datos relacional.
- Librerías adicionales de Express.js para soporte y seguridad.

---

## 📋 **Requisitos para ejecutar el proyecto**
Antes de ejecutar este proyecto, asegúrate de tener instalados:
1. **Node.js:** [Descargar Node.js](https://nodejs.org/)
2. **npm:** Incluido con Node.js para gestionar dependencias.
3. **MySQL:** Para la base de datos.

---

## ⚙️ **Pasos de instalación**
Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Thomas-Cornejo/BackendProjectFundation.git
3. Ingresa al directorio del proyecto:
cd BackendProjectFundation
4. Instala las dependencias
5. Configura las variables de entorno necesarias para la conexión con la base de datos.
6. Ejecuta el servidor: npm run dev

**Estructura del proyecto 🗂️**
Backend/
* Controllers/: Gestion de la logica de funciones del backend
* routes/: Defincion de rutas que conectan los controladores con los endpoints
* models/: Contiene los modelos de datos definidos con Sequelize para la interacción con la base de datos.
* index.js: Archivo donde se configuran:
Conexión a la base de datos.
* App.js: Archivo principal donde se configuran:
Middleware.
Configuracion del puerto.

**🚀 Despliegue**
El despliegue del backend se realiza automáticamente al hacer un push a la rama main.
La plataforma RAILWAY se encarga de gestionar el despliegue.

Enlace a la API:
https://backendprojectfundation-production.up.railway.app

**🤝 Contribución**
Si deseas contribuir al proyecto, no dudes en contactarme:
📧 Correo: cornejocastrot@gmail.com
