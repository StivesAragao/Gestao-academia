import React, { useState, useEffect } from 'react';
import { getCollection, saveCollection } from '../utils/storage';

function MatriculasPage() {
  const [matriculas, setMatriculas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  
  const [alunoId, setAlunoId] = useState('');
  const [plano, setPlano] = useState('Smart');
  const [dataInicio, setDataInicio] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [search, setSearch] = useState('');

  // Editing state
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setMatriculas(getCollection('matriculas'));
    setAlunos(getCollection('alunos'));
  }, []);

  const clearForm = () => {
    setAlunoId('');
    setPlano('Smart');
    setDataInicio('');
    setStatus('Ativo');
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!alunoId || !dataInicio) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let updatedList;
    if (editId) {
      updatedList = matriculas.map(m => 
        m.id === editId 
          ? { ...m, alunoId: parseInt(alunoId), plano, dataInicio, status } 
          : m
      );
    } else {
      const newMatricula = {
        id: matriculas.length > 0 ? Math.max(...matriculas.map(m => m.id)) + 1 : 1,
        alunoId: parseInt(alunoId),
        plano,
        dataInicio,
        status
      };
      updatedList = [...matriculas, newMatricula];
    }

    setMatriculas(updatedList);
    saveCollection('matriculas', updatedList);
    clearForm();
  };

  const handleEdit = (matricula) => {
    setEditId(matricula.id);
    setAlunoId(matricula.alunoId.toString());
    setPlano(matricula.plano);
    setDataInicio(matricula.dataInicio);
    setStatus(matricula.status);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta matrícula?')) {
      const updatedList = matriculas.filter(m => m.id !== id);
      setMatriculas(updatedList);
      saveCollection('matriculas', updatedList);
    }
  };

  const getAlunoNome = (id) => {
    const student = alunos.find(a => a.id === id);
    return student ? student.nome : 'Aluno não encontrado';
  };

  const filteredMatriculas = matriculas.filter(m => {
    const nome = getAlunoNome(m.alunoId).toLowerCase();
    return nome.includes(search.toLowerCase()) || m.plano.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-white font-weight-bold">Manter Matrículas</h1>
          <p className="text-muted mb-0">Controle de planos e vigência contratual dos alunos.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-fit-primary">
            <i className="fas fa-plus mr-2"></i> Nova Matrícula
          </button>
        )}
      </div>

      {showForm && (
        <div className="card fit-card mb-4">
          <div className="fit-card-header">
            <h6 className="fit-card-title">{editId ? 'Editar Matrícula' : 'Nova Matrícula'}</h6>
            <button onClick={clearForm} className="btn btn-sm btn-fit-secondary">
              <i className="fas fa-times"></i> Fechar
            </button>
          </div>
          <div className="fit-card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Aluno *</label>
                  <select
                    className="form-control fit-select"
                    value={alunoId}
                    onChange={(e) => setAlunoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um aluno...</option>
                    {alunos.map(aluno => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} (CPF: {aluno.cpf})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Plano de Treino *</label>
                  <select
                    className="form-control fit-select"
                    value={plano}
                    onChange={(e) => setPlano(e.target.value)}
                  >
                    <option value="Smart">Smart - R$ 99,90/mês</option>
                    <option value="Black">Black - R$ 119,90/mês</option>
                    <option value="Fit">Fit - R$ 79,90/mês</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Data de Início *</label>
                  <input
                    type="date"
                    className="form-control fit-input"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Status da Matrícula</label>
                  <select
                    className="form-control fit-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-fit-primary mr-2">
                  <i className="fas fa-save mr-2"></i> {editId ? 'Atualizar Matrícula' : 'Confirmar Matrícula'}
                </button>
                <button type="button" onClick={clearForm} className="btn btn-fit-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MATRICULAS LIST */}
      <div className="card fit-card">
        <div className="fit-card-header d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="fit-card-title">Histórico de Matrículas</h6>
          <div className="mt-2 mt-md-0" style={{ minWidth: '250px' }}>
            <input
              type="text"
              className="form-control fit-input form-control-sm"
              placeholder="Buscar por nome ou plano..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="fit-card-body">
          <div className="table-responsive">
            <table className="table fit-table">
              <thead>
                <tr>
                  <th>Cód Matrícula</th>
                  <th>Nome do Aluno</th>
                  <th>Plano Contratado</th>
                  <th>Data de Início</th>
                  <th>Status</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatriculas.map(m => (
                  <tr key={m.id}>
                    <td>#{m.id}</td>
                    <td className="text-white font-weight-bold">{getAlunoNome(m.alunoId)}</td>
                    <td>
                      <span className="badge fit-badge" style={{ backgroundColor: 'rgba(255,209,0,0.1)', color: '#FFD100', border: '1px solid #FFD100' }}>
                        {m.plano}
                      </span>
                    </td>
                    <td>{new Date(m.dataInicio).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                    <td>
                      <span className={`badge fit-badge ${
                        m.status === 'Ativo' ? 'fit-badge-success' :
                        m.status === 'Cancelado' ? 'fit-badge-danger' : 'fit-badge-warning'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(m)} className="btn btn-sm btn-outline-warning mr-2" title="Editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="btn btn-sm btn-outline-danger" title="Excluir">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMatriculas.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">Nenhuma matrícula encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatriculasPage;
