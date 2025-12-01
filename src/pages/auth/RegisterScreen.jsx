import React, { useState } from 'react';
import styles from './RegisterScreen.module.css';
import { register } from '../../api/auth';

// componente para la pantalla de registro
function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError('');

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    if (!email || !password) {
      setError('Por favor llena al menos tu email y contraseña.');
      return;
    }

    setLoading(true);

    try {
      
      const { accessToken, refreshToken } = await register(email, password);

     
      onRegisterSuccess({ accessToken, refreshToken });
    } catch (err) {
      console.error(err);
      setError('No se pudo completar el registro. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // estructura html de la pantalla
  return (
    <div className={styles.authPage}>
      <main className={styles.shell}>
        {/* imagen de la izquierda */}
        <aside className={styles.art}>
          <div className={styles.band}>
            <img
              className={styles.mountains}
              src="./img/mountains.png"
              alt="montañas"
            />
          </div>
        </aside>

        {/* formulario de la derecha */}
        <div className={styles.formCard} role="form" aria-labelledby="t">
          <h1 id="t">¡Comencemos!</h1>

          <form onSubmit={handleRegister}>
            {/* campo usuario (de momento solo en front) */}
            <label className={styles.label} htmlFor="user">
              Usuario
            </label>
            <input
              id="user"
              className={styles.input}
              type="text"
              placeholder="Crea un nombre de usuario"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* campo email */}
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="Ingresa tu email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* campo contraseña */}
            <label className={styles.label} htmlFor="pass">
              Contraseña
            </label>
            <input
              id="pass"
              className={styles.input}
              type="password"
              placeholder="Ingresa una contraseña"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* aceptar términos */}
            <label className={styles.check}>
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                Acepto los <b>términos & condiciones</b>
              </span>
            </label>

            {/* mensaje de error */}
            {error && <p className={styles.error}>{error}</p>}

            {/* botón de registrarse */}
            <button
              type="submit"
              className={styles.btn}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          {/* enlace para ir a iniciar sesión */}
          <div className={styles.formLink}>
            ¿Ya tienes cuenta?{' '}
            <span onClick={onNavigateToLogin}>
              Inicia sesión aquí
            </span>
          </div>

          {/* sección extra al final */}
          <div className={styles.snow}></div>
        </div>
      </main>
    </div>
  );
}

export default RegisterScreen;
