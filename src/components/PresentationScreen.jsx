import React from 'react';
// importar estilos específicos
import styles from './PresentationScreen.module.css';

// componente para la pantalla de bienvenida/presentación
function PresentationScreen({ onNavigate, onGuestLogin }) {
  // recibe funciones para ir a login/registro o entrar como invitado

  // estructura html de la pantalla
  return (
    // contenedor principal
    <div className={styles.authPage}>
      {/* contenedor interior */}
      <div className={styles.shell}>

        {/* sección izquierda con imagen */}
        <div className={styles.art}>
          <div className={styles.band}>
            <img className={styles.mountains} src="./img/mountains.png" alt="montañas" />
          </div>
        </div>

        {/* sección derecha con texto y botones */}
        <div className={styles.formCard}>
          {/* texto de bienvenida */}
          <h1>¡bienvenido!</h1>
          <p>
            ¡planifica tu día!<br/>
            nosotros nos encargamos del clima
          </p>

          {/* contenedor de los botones */}
          <div className={styles.actions}>
            {/* botón para ir a iniciar sesión */}
            <a
              className={styles.btn}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
            >
              iniciar sesión
            </a>

            {/* botón para ir a registro */}
            <a
              className={styles.btn}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('register'); }}
            >
              registro
            </a>

            {/* botón para entrar como invitado */}
            <a
              className={styles.btn}
              href="#"
              onClick={(e) => { e.preventDefault(); onGuestLogin(); }}
            >
              invitado
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// exportar componente
export default PresentationScreen;