import React from 'react';
// importar estilos para esta pantalla
import styles from './RegisterScreen.module.css';

// componente para la pantalla de registro
function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
  // recibe funciones para manejar el éxito y para ir a login

  // función para cuando se intenta registrar
  const handleRegister = (e) => {
    e.preventDefault(); // previene recarga
    onRegisterSuccess(); // avisa que el registro fue exitoso (simulado)
  };

  // estructura html de la pantalla
  return (
    // contenedor principal
    <div className={styles.authPage}>
      {/* contenedor interior */}
      <main className={styles.shell}>
        {/* imagen de la izquierda */}
        <aside className={styles.art}>
          <div className={styles.band}>
            <img className={styles.mountains} src="./img/mountains.png" alt="montañas" />
          </div>
        </aside>

        {/* formulario de la derecha */}
        <div className={styles.formCard} role="form" aria-labelledby="t">
          {/* título */}
          <h1 id="t">¡Comencemos!</h1>

          {/* campo usuario */}
          <label className={styles.label} htmlFor="user">Usuario</label>
          <input id="user" className={styles.input} type="text" placeholder="Crea un nombre de usuario" autoComplete="username" />

          {/* campo email */}
          <label className={styles.label} htmlFor="email">Email</label>
          <input id="email" className={styles.input} type="email" placeholder="Ingresa tu email" autoComplete="email" />

          {/* campo contraseña */}
          <label className={styles.label} htmlFor="pass">Contraseña</label>
          <input id="pass" className={styles.input} type="password" placeholder="Ingresa una contraseña" autoComplete="new-password" />

          {/* aceptar términos */}
          <label className={styles.check}>
            <input type="checkbox" id="terms" />
            <span>Acepto los <b>términos & condiciones</b></span>
          </label>

          {/* botón de registrarse */}
          <a className={styles.btn} href="#" onClick={handleRegister}>Registrarse</a>

          {/* enlace para ir a iniciar sesión */}
          <div className={styles.formLink}>
            ¿Ya tienes cuenta? <span onClick={onNavigateToLogin}>Inicia sesión aquí</span>
          </div>

          {/* sección extra al final */}
          <div className={styles.snow}>
          </div>
        </div>
      </main>
    </div>
  );
}

// exportar
export default RegisterScreen;