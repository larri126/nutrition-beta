Markdown
# 🏋️‍♂️ Training & Nutrition SaaS Web-App (Beta)

Este proyecto es una Web-App tipo SaaS enfocada en entrenamiento y nutrición, diseñada bajo la filosofía **Mobile-First**.

> **⚠️ Nota Importante:** Actualmente, el proyecto **NO** está conectado a Firebase ni Stripe real. Funciona con un servidor local aislado provisionalmente en el navegador para propósitos de desarrollo de la interfaz y lógica inicial.

## 🛠️ Stack Tecnológico (Fase Actual)

* **Frontend:** Next.js 
* **Estilos:** Tailwind CSS v4 (UI oscura tipo "Bento Grid") 
* **Lenguaje:** TypeScript
* **Arquitectura:** Mobile-First (Adaptación perfecta requerida para iPhone/Android) 

## 🚀 Guía de Instalación y Despliegue

Sigue estos pasos detallados para levantar el entorno de desarrollo. Ten en cuenta que en el repositorio **faltarán** las carpetas `node_modules` y `.next`, las cuales se generarán en estos pasos.

### 1. Clonar el Repositorio
El proyecto actual se encuentra específicamente en la rama `Beta-1.0.x`. Asegúrate de usar este flag al clonar:

```bash
git clone -b Beta-1.0.x https://github.com/powerjhosfit/nutrition--app
2. Instalar Dependencias
Abre la terminal (bash) en la raíz de la carpeta descargada e instala las librerías necesarias:

#Bash
npm install

#3. Ejecutar el Servidor Local
Para abrir el servidor web aislado, utiliza el siguiente comando en la terminal de tu editor o sistema:

#Bash
npm run dev
Esto iniciará el servidor (generalmente en el puerto 3000).

#📱 Cómo ver la Web en el Móvil (IP Local / Datos Compartidos)
Dado que la prioridad es la experiencia móvil, es vital probar la interfaz directamente en un smartphone. Los pasos son los mismos si estás conectado a la misma red Wi-Fi o si estás compartiendo datos (Hotspot) desde el móvil al PC.

Abre una terminal en tu PC (PowerShell o CMD en Windows, Terminal en Mac/Linux).

Ejecuta el comando para ver tu configuración de red:

Windows: ipconfig (Busca la dirección IPv4 de tu adaptador de red, ej: 192.168.1.XX).

En el navegador de tu móvil, escribe la IP de tu PC seguida del puerto del servidor: http://xxx.xxx.xx.XX:3000 (Sustituye por tu IP real).

📂 Estado del Proyecto y Notas del Desarrollador
Autenticación: La lógica de inicio de sesión y registro simula los roles (Admin, Entrenador, Alumno) localmente.

Base de Datos: No se conecta a Firestore; los datos persisten temporalmente en la sesión del navegador.

Pagos: La integración con Stripe Checkout está desactivada en esta rama.

Multimedia: Los videos están configurados para no reproducirse automáticamente (ahorro de datos).