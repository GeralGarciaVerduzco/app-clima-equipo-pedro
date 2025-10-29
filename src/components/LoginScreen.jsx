import React from 'react';
// importar estilos específicos para esta pantalla
import styles from './LoginScreen.module.css';

// componente para la pantalla de inicio de sesión
function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
  // recibe funciones para manejar el éxito y para ir a registro

  // función para cuando se intenta iniciar sesión
  const handleLogin = (e) => {
    e.preventDefault(); // previene recarga de página
    onLoginSuccess(); // avisa que el login fue exitoso (simulado)
  };

  // estructura html de la pantalla
  return (
    // contenedor principal de la página
    <div className={styles.authPage}>
      {/* contenedor interior principal */}
      <main className={styles.shell}>
        {/* parte izquierda con la imagen */}
        <aside className={styles.art}>
          <div className={styles.band}>
            <img className={styles.mountains} src="./img/mountains.png" alt="montañas" />
          </div>
        </aside>

        {/* parte derecha con el formulario */}
        <div className={styles.formCard} role="form" aria-labelledby="t">
          {/* título principal */}
          <h1 id="t">¡hola otra vez!</h1>

          {/* campo de email */}
          <label className={styles.label} htmlFor="email">email</label>
          <input id="email" className={styles.input} type="email" placeholder="ingresa tu email" autoComplete="email" />

          {/* campo de contraseña */}
          <label className={styles.label} htmlFor="pass">contraseña</label>
          <input id="pass" className={styles.input} type="password" placeholder="ingresa tu contraseña" autoComplete="current-password" />

          {/* opción para recordar */}
          <label className={styles.check}>
            <input type="checkbox" id="remember" />
            <span>recuérdame por 3 meses</span>
          </label>

          {/* botón de acción principal */}
          <a className={styles.btn} href="#" onClick={handleLogin}>iniciar sesión</a>

          {/* enlace secundario para registrarse */}
          <div className={styles.formLink}>
            ¿no tienes cuenta? <span onClick={onNavigateToRegister}>regístrate aquí</span>
          </div>

          {/* contenedor extra al final (puede ser para espaciado o contenido adicional) */}
          <div className={styles.snow}>
          </div>
        </div>
      </main>
    </div>
  );
}

// exportar componente
export default LoginScreen;