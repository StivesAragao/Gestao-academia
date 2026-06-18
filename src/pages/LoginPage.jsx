import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', 'Stives Aragao');
      setError('');
      // Force reload or state update to make layout aware
      window.location.href = '/';
    } else {
      setError('Credenciais inválidas. Use admin / admin');
    }
  };

  return (
    <div className="login-container login-bg-shapes">
      <div className="login-card">
        <div className="login-logo">
          FIT<span>CEUB</span>
        </div>
        <h5 className="text-center mb-4 text-white font-weight-light">
          Área Administrativa
        </h5>
        
        {error && (
          <div className="alert alert-danger py-2 text-center" style={{ fontSize: '0.85rem' }}>
            <i className="fas fa-exclamation-circle mr-1"></i> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="fit-label" htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              className="form-control fit-input"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="fit-label" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="form-control fit-input"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-fit-primary w-100 py-3 mt-2">
            Entrar no Sistema
          </button>
        </form>

        <div className="text-center mt-4 text-muted" style={{ fontSize: '0.8rem' }}>
          Dica: Usuário e Senha são <code>admin</code>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
