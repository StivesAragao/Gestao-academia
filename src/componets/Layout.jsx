import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('username') || 'Administrador';

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  const getActiveCls = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div id="wrapper">
      {/* SIDEBAR (MENU LATERAL) */}
      <ul className="navbar-nav fit-sidebar sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon mr-2">
            <i className="fas fa-dumbbell" style={{ color: '#FFD100' }}></i>
          </div>
          <div className="sidebar-brand-text">FIT<span>CEUB</span></div>
        </Link>

        <div className="fit-sidebar-divider"></div>

        <li className={`nav-item ${getActiveCls('/')}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-chart-line"></i>
            <span>Painel Geral</span>
          </Link>
        </li>

        <div className="fit-sidebar-divider"></div>

        {/* ALUNOS SECTION */}
        <li className={`nav-item ${getActiveCls('/alunos')}`}>
          <Link className="nav-link" to="/alunos">
            <i className="fas fa-fw fa-users"></i>
            <span>Manter Alunos</span>
          </Link>
        </li>

        <li className={`nav-item ${getActiveCls('/matriculas')}`}>
          <Link className="nav-link" to="/matriculas">
            <i className="fas fa-fw fa-id-card"></i>
            <span>Manter Matrículas</span>
          </Link>
        </li>

        <div className="fit-sidebar-divider"></div>

        {/* FINANCE SECTION */}
        <li className={`nav-item ${getActiveCls('/receitas')}`}>
          <Link className="nav-link" to="/receitas">
            <i className="fas fa-fw fa-hand-holding-usd" style={{ color: '#28a745' }}></i>
            <span>Manter Receitas</span>
          </Link>
        </li>

        <li className={`nav-item ${getActiveCls('/despesas')}`}>
          <Link className="nav-link" to="/despesas">
            <i className="fas fa-fw fa-file-invoice-dollar" style={{ color: '#dc3545' }}></i>
            <span>Manter Despesas</span>
          </Link>
        </li>

        <div className="fit-sidebar-divider"></div>

        {/* ACADEMIC LINKS */}
        <li className={`nav-item ${getActiveCls('/sobre')}`}>
          <Link className="nav-link" to="/sobre">
            <i className="fas fa-fw fa-info-circle"></i>
            <span>Sobre o Sistema</span>
          </Link>
        </li>
        <div className="fit-sidebar-divider"></div>
      </ul>

      {/* CONTEÚDO PRINCIPAL */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          
          {/* TOPBAR (BARRA SUPERIOR) */}
          <nav className="navbar navbar-expand fit-topbar mb-4 static-top">
            <div className="text-white font-weight-bold d-none d-md-block" style={{ letterSpacing: '0.5px' }}>
              <i className="fas fa-calendar-day mr-2 text-warning"></i> 
              Sistema Integrado de Gestão Fitness
            </div>
            
            <ul className="navbar-nav ml-auto align-items-center">
              <div className="user-info mr-3">
                <span className="user-name">{userName}</span>
                <div className="user-avatar">
                  {userName.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-sm btn-outline-light" title="Sair do Sistema">
                <i className="fas fa-sign-out-alt"></i> Sair
              </button>
            </ul>
          </nav>

          {/* ÁREA ONDE AS PÁGINAS MUDAM */}
          <div className="fit-container">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Layout;
