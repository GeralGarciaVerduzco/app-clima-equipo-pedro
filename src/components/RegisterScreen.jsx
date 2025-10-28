import React from 'react';
// 1. IMPORTANTE: Importa los estilos como 'styles'
import styles from './RegisterScreen.module.css';

// Recibe las funciones de navegación desde App.jsx
function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {

  // Simula un registro exitoso
  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de validación
    onRegisterSuccess();
  };

  return (
    // 2. Usa la clase 'authPage' del módulo
    <div className={styles.authPage}>
      {/* 3. Todas las clases ahora usan 'styles.nombreDeLaClase' */}
      <main className={styles.shell}>
        <aside className={styles.art}>
          <div className={styles.band}>
            <img className={styles.mountains} src="./img/mountains.png" alt="Montañas" />
          </div>
        </aside>

        <div className={styles.formCard} role="form" aria-labelledby="t">
          <h1 id="t">¡Comencemos!</h1>

          <label className={styles.label} htmlFor="user">Usuario</label>
          <input id="user" className={styles.input} type="text" placeholder="Crea un nombre de usuario" autoComplete="username" />

          <label className={styles.label} htmlFor="email">Email</label>
          <input id="email" className={styles.input} type="email" placeholder="Ingresa tu Email" autoComplete="email" />

          <label className={styles.label} htmlFor="pass">Contraseña</label>
          <input id="pass" className={styles.input} type="password" placeholder="Ingresa una contraseña" autoComplete="new-password" />

          <label className={styles.check}>
            <input type="checkbox" id="terms" />
            <span>Acepto los <b>Términos & Condiciones</b></span>
          </label>

          <a className={styles.btn} href="#" onClick={handleRegister}>Registrarse</a>
          
          <div className={styles.formLink}>
            ¿Ya tienes cuenta? <span onClick={onNavigateToLogin}>Inicia Sesión aquí</span>
          </div>

          <div className={styles.snow}>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterScreen;

