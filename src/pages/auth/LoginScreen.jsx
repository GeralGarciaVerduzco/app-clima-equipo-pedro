import React, { useState } from 'react';
import styles from './LoginScreen.module.css';
import { login } from '../../api/auth';

// componente para la pantalla de inicio de sesión
function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
  // estado local para el formulario y la UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError('');

    try {
      
      const { accessToken, refreshToken } = await login(email, password);

      
      onLoginSuccess({ accessToken, refreshToken });
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar sesión. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  // estructura html de la pantalla
  return (
    <div className={styles.authPage}>
      <main className={styles.shell}>
        {/* parte izquierda con la imagen */}
        <aside className={styles.art}>
          <div className={styles.band}>
            <img
              className={styles.mountains}
              src="./img/mountains.png"
              alt="montañas"
            />
          </div>
        </aside>

        {/* parte derecha con el formulario */}
        <div className={styles.formCard} role="form" aria-labelledby="t">
          <h1 id="t">¡Hola otra vez!</h1>

          {/* usamos un <form> para manejar submit correctamente */}
          <form onSubmit={handleLogin}>
            {/* campo de email */}
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

            {/* campo de contraseña */}
            <label className={styles.label} htmlFor="pass">
              Contraseña
            </label>
            <input
              id="pass"
              className={styles.input}
              type="password"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* opción para recordar */}
            <label className={styles.check}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recuérdame por 3 meses</span>
            </label>

            {/* mensaje de error si algo falla */}
            {error && <p className={styles.error}>{error}</p>}

            {/* botón de acción principal */}
            <button
              type="submit"
              className={styles.btn}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* enlace secundario para registrarse */}
          <div className={styles.formLink}>
            ¿No tienes cuenta?{' '}
            <span onClick={onNavigateToRegister}>
              Regístrate aquí
            </span>
          </div>

          {/* contenedor extra al final */}
          <div className={styles.snow}></div>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
