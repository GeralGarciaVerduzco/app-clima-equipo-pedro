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
          <h1 id="t">¡Hola otra vez!</h1>

          {/* campo de email */}
          <label className={styles.label} htmlFor="email">Email</label>
          <input id="email" className={styles.input} type="email" placeholder="Ingresa tu email" autoComplete="email" />

          {/* campo de contraseña */}
          <label className={styles.label} htmlFor="pass">Contraseña</label>
          <input id="pass" className={styles.input} type="password" placeholder="Ingresa tu contraseña" autoComplete="current-password" />

          {/* opción para recordar */}
          <label className={styles.check}>
            <input type="checkbox" id="remember" />
            <span>Recuérdame por 3 meses</span>
          </label>

          {/* botón de acción principal */}
          <a className={styles.btn} href="#" onClick={handleLogin}>Iniciar sesión</a>

          {/* enlace secundario para registrarse */}
          <div className={styles.formLink}>
            ¿No tienes cuenta? <span onClick={onNavigateToRegister}>Regístrate aquí</span>
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