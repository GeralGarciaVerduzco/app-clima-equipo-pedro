import React from 'react';
// 1. IMPORTANTE: Importamos el archivo CSS y lo llamamos 'styles'
import styles from './LoginScreen.module.css';

// Recibe la función de cambiar de página desde App.jsx
function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {

  // Esta función simula el inicio de sesión exitoso
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    onLoginSuccess();
  };

  return (
    // 2. IMPORTANTE: Usamos 'styles.authPage' para aplicar la clase del archivo CSS
    <div className={styles.authPage}>
      {/* 3. Todas las clases ahora usan 'styles.nombreDeLaClase' */}
      <main className={styles.shell}>
        <aside className={styles.art}>
          <div className={styles.band}>
            <img className={styles.mountains} src="./img/mountains.png" alt="Montañas" />
          </div>
        </aside>

        <div className={styles.formCard} role="form" aria-labelledby="t">
          <h1 id="t">¡Hola otra vez!</h1>

          <label className={styles.label} htmlFor="email">Email</label>
          <input id="email" className={styles.input} type="email" placeholder="Ingresa tu Email" autoComplete="email" />

          <label className={styles.label} htmlFor="pass">Contraseña</label>
          <input id="pass" className={styles.input} type="password" placeholder="Ingresa tu contraseña" autoComplete="current-password" />

          <label className={styles.check}>
            <input type="checkbox" id="remember" />
            <span>Recuérdame por 3 meses</span>
          </label>

          <a className={styles.btn} href="#" onClick={handleLogin}>Iniciar sesión</a>

          <div className={styles.formLink}>
            ¿No tienes cuenta? <span onClick={onNavigateToRegister}>Regístrate aquí</span>
          </div>

          <div className={styles.snow}>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;