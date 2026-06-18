import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollection } from '../utils/storage';

function HomePage() {
  const [alunos, setAlunos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    setAlunos(getCollection('alunos'));
    setMatriculas(getCollection('matriculas'));
    setDespesas(getCollection('despesas'));
    setReceitas(getCollection('receitas'));
  }, []);

  const totalAlunosAtivos = alunos.filter(a => a.status === 'Ativo').length;
  
  const totalReceitas = receitas.reduce((sum, item) => sum + parseFloat(item.valor || 0), 0);
  const totalDespesas = despesas.reduce((sum, item) => sum + parseFloat(item.valor || 0), 0);
  const saldo = totalReceitas - totalDespesas;

  // Formatting values
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-white font-weight-bold">Dashboard Geral</h1>
          <p className="text-muted mb-0">Resumo de desempenho e controle administrativo da academia.</p>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="row">
        {/* Active Students Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card fit-card metric-card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="metric-title">Alunos Ativos</div>
                  <div className="metric-value">{totalAlunosAtivos}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-warning"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenues Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card fit-card metric-card success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="metric-title">Faturamento (Receitas)</div>
                  <div className="metric-value">{formatCurrency(totalReceitas)}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card fit-card metric-card danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="metric-title">Despesas Totais</div>
                  <div className="metric-value">{formatCurrency(totalDespesas)}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-file-invoice-dollar fa-2x text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Balance Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card fit-card metric-card shadow h-100 py-2" style={{ borderLeftColor: saldo >= 0 ? '#28a745' : '#dc3545' }}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="metric-title">Saldo Financeiro</div>
                  <div className={`metric-value ${saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatCurrency(saldo)}
                  </div>
                </div>
                <div className="col-auto">
                  <i className={`fas ${saldo >= 0 ? 'fa-scale-balanced' : 'fa-triangle-exclamation'} fa-2x text-muted`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Transactions */}
        <div className="col-lg-7 mb-4">
          <div className="card fit-card">
            <div className="fit-card-header">
              <h6 className="fit-card-title">Fluxo de Caixa Recente</h6>
              <span className="badge fit-badge fit-badge-success">Atualizado</span>
            </div>
            <div className="fit-card-body">
              <div className="table-responsive">
                <table className="table fit-table">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Tipo</th>
                      <th>Valor</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Combine last 3 revenues and expenses for summary */}
                    {[
                      ...receitas.slice(0, 3).map(r => ({ ...r, tipo: 'Receita' })),
                      ...despesas.slice(0, 3).map(d => ({ ...d, tipo: 'Despesa' }))
                    ]
                      .sort((a, b) => new Date(b.dataRecebimento || b.dataVencimento) - new Date(a.dataRecebimento || a.dataVencimento))
                      .slice(0, 5)
                      .map((item, index) => (
                        <tr key={index}>
                          <td className="text-white font-weight-bold">{item.descricao}</td>
                          <td>
                            <span className={`badge fit-badge ${item.tipo === 'Receita' ? 'fit-badge-success' : 'fit-badge-danger'}`}>
                              {item.tipo}
                            </span>
                          </td>
                          <td className={item.tipo === 'Receita' ? 'text-success' : 'text-danger'}>
                            {item.tipo === 'Receita' ? '+' : '-'} {formatCurrency(item.valor)}
                          </td>
                          <td>{item.dataRecebimento || item.dataVencimento}</td>
                        </tr>
                      ))}
                    {receitas.length === 0 && despesas.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">Nenhuma transação cadastrada.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="col-lg-5 mb-4">
          <div className="card fit-card h-100">
            <div className="fit-card-header">
              <h6 className="fit-card-title">Ações Rápidas</h6>
            </div>
            <div className="fit-card-body d-flex flex-column justify-content-around">
              <Link to="/alunos" className="btn btn-fit-primary mb-3 text-center d-block">
                <i className="fas fa-user-plus mr-2"></i> Cadastrar Aluno
              </Link>
              <Link to="/matriculas" className="btn btn-fit-outline mb-3 text-center d-block">
                <i className="fas fa-id-card mr-2"></i> Nova Matrícula
              </Link>
              <Link to="/receitas" className="btn btn-fit-outline mb-3 text-center d-block">
                <i className="fas fa-hand-holding-usd mr-2"></i> Nova Receita
              </Link>
              <Link to="/despesas" className="btn btn-fit-outline text-center d-block">
                <i className="fas fa-file-invoice-dollar mr-2"></i> Nova Despesa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;