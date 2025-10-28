import React from 'react';
// 1. Importa los estilos y los llama 'styles'
import styles from './PresentationScreen.module.css'; 

// Recibe funciones para cambiar de página o entrar como invitado
function PresentationScreen({ onNavigate, onGuestLogin }) {
  return (
    // 2. Usa los estilos importados (ej: styles.authPage)
    <div className={styles.authPage}>
      <div className={styles.shell}>
        
        {/* Columna de Arte (Imagen) */}
        <div className={styles.art}>
          <div className={styles.band}>
            {/* Solo la imagen de las montañas (como pediste) */}
            <img className={styles.mountains} src="./img/mountains.png" alt="Montañas" />
          </div>
        </div>

        {/* Columna de Contenido (Texto y Botones) */}
        <div className={styles.formCard}>
          <h1>¡Bienvenido!</h1>
          <p>
            ¡Planifica tu día!<br/>
            Nosotros nos encargamos del clima
          </p>

          <div className={styles.actions}>
            <a 
              className={styles.btn} 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
            >
              Iniciar Sesión
            </a>
            
            <a 
              className={styles.btn} 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('register'); }}
            >
              Registro
            </a>
            
            <a 
              className={styles.btn} 
              href="#" 
              onClick={(e) => { e.preventDefault(); onGuestLogin(); }}
            >
              Invitado
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationScreen;

