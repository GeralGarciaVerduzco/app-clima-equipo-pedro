# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

----------------------------------------------------------------------------------------------------------------------------------

HoneyFrost App del Clima

Una aplicación web sencilla construida con React para mostrar información del clima, pronóstico horario, fases lunares y permitir a los usuarios guardar ubicaciones favoritas.

***Descripción**

Esta aplicación presenta una interfaz para visualizar las condiciones climáticas actuales de una ubicación predeterminada (Cancún, en los datos de ejemplo que usamos). Incluye detalles como temperatura, sensación térmica, mínimas/máximas, humedad, presión, visibilidad, etc. También muestra un pronóstico por horas y las fases lunares para la semana.

Incorpora un sistema básico de autenticación (simulado) con pantallas de Bienvenida, Inicio de Sesión y Registro. Los usuarios que inician sesión pueden marcar la ubicación actual como favorita, guardándose en una lista visible en la parte inferior.

***Características***

* Muestra temperatura, condición, mín/máx, sensación térmica, amanecer/atardecer, humedad, nubes, presión, visibilidad y viento.
* Carrusel horizontal con el pronóstico para las próximas horas.
* Carrusel horizontal con las fases lunares para la semana.
* Pantalla de Bienvenida con opciones para Iniciar Sesión, Registrarse o entrar como Invitado.
* Pantallas separadas para Login y Registro (funcionalidad simulada).
* Persistencia de sesión simple usando `localStorage`.
* Botón para Cerrar Sesión.
* Los usuarios logueados pueden marcar la ubicación actual como favorita.
* Las ubicaciones guardadas se muestran en una sección dedicada con un resumen del clima (Ciudad, Temp. Actual, Condición, Min/Max y 5 métricas).
* Funcionalidad para quitar la ubicación guardada al desmarcar el favorito.
* Botón para cambiar entre Grados Celsius (°C) y Fahrenheit (°F).
* Botón para activar/desactivar el Modo Oscuro.
* Barra de navegación superior con logo, búsqueda (solo UI) y controles.
* Diseño responsive básico.

Tecnologías Utilizadas

React: Biblioteca principal para construir la interfaz de usuario.
Estilos personalizados (incluyendo CSS Modules para componentes específicos).
JavaScript:** Lógica de la aplicación.

***Posibles Mejoras*** 

Integrar una API real de clima 
Implementar la funcionalidad de búsqueda de ubicaciones.
Mejorar la persistencia de los favoritos (guardarlos por usuario en `localStorage` o base de datos).
Mejorar el diseño responsive.
Implementar autenticación real.


