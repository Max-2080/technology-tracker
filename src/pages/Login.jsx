// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Простая проверка (в реальном приложении - запрос к API)
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      onLogin(username);
      navigate('/dashboard');
    } else if (username === 'user' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      onLogin(username);
      navigate('/');
    } else {
      setError('Неверные данные для входа. Попробуйте admin/password или user/123456');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Вход в систему</h1>
          <p>Войдите в свой аккаунт для доступа к трекеру технологий</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Войти
          </button>

          <div className="login-hint">
            <p><strong>Тестовые аккаунты:</strong></p>
            <p>👑 Админ: admin / password</p>
            <p>👤 Пользователь: user / 123456</p>
          </div>

          <div className="login-footer">
            <p>Нет аккаунта? <Link to="/">Начните использовать как гость</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;