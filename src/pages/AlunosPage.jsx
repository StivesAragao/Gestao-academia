import React, { useState, useEffect } from 'react';
import { getCollection, saveCollection } from '../utils/storage';

function AlunosPage() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [search, setSearch] = useState('');
  
  // Editing state
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setAlunos(getCollection('alunos'));
  }, []);

  const clearForm = () => {
    setNome('');
    setCpf('');
    setTelefone('');
    setNascimento('');
    setStatus('Ativo');
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !cpf) {
      alert('Nome e CPF são obrigatórios.');
      return;
    }

    let updatedList;
    if (editId) {
      // Edit
      updatedList = alunos.map(aluno => 
        aluno.id === editId 
          ? { ...aluno, nome, cpf, telefone, nascimento, status } 
          : aluno
      );
    } else {
      // Create
      const newAluno = {
        id: alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1,
        nome,
        cpf,
        telefone,
        nascimento,
        status
      };
      updatedList = [...alunos, newAluno];
    }

    setAlunos(updatedList);
    saveCollection('alunos', updatedList);
    clearForm();
  };

  const handleEdit = (aluno) => {
    setEditId(aluno.id);
    setNome(aluno.nome);
    setCpf(aluno.cpf);
    setTelefone(aluno.telefone);
    setNascimento(aluno.nascimento);
    setStatus(aluno.status);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      const updatedList = alunos.filter(aluno => aluno.id !== id);
      setAlunos(updatedList);
      saveCollection('alunos', updatedList);
    }
  };

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(search.toLowerCase()) ||
    aluno.cpf.includes(search)
  );

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-white font-weight-bold">Manter Alunos</h1>
          <p className="text-muted mb-0">Cadastro e listagem de alunos da academia.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-fit-primary">
            <i className="fas fa-plus mr-2"></i> Novo Aluno
          </button>
        )}
      </div>

      {showForm && (
        <div className="card fit-card mb-4">
          <div className="fit-card-header">
            <h6 className="fit-card-title">{editId ? 'Editar Aluno' : 'Cadastrar Aluno'}</h6>
            <button onClick={clearForm} className="btn btn-sm btn-fit-secondary">
              <i className="fas fa-times"></i> Fechar
            </button>
          </div>
          <div className="fit-card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Nome Completo *</label>
                  <input
                    type="text"
                    className="form-control fit-input"
                    placeholder="Nome do aluno"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">CPF *</label>
                  <input
                    type="text"
                    className="form-control fit-input"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Telefone</label>
                  <input
                    type="text"
                    className="form-control fit-input"
                    placeholder="(61) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control fit-input"
                    value={nascimento}
                    onChange={(e) => setNascimento(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Status</label>
                  <select
                    className="form-control fit-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-fit-primary mr-2">
                  <i className="fas fa-save mr-2"></i> {editId ? 'Salvar Alterações' : 'Salvar Aluno'}
                </button>
                <button type="button" onClick={clearForm} className="btn btn-fit-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIST OF STUDENTS */}
      <div className="card fit-card">
        <div className="fit-card-header d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="fit-card-title">Listagem de Alunos</h6>
          <div className="mt-2 mt-md-0" style={{ minWidth: '250px' }}>
            <input
              type="text"
              className="form-control fit-input form-control-sm"
              placeholder="Buscar por nome ou CPF..."
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
                  <th>Cód</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Nascimento</th>
                  <th>Status</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td className="text-white font-weight-bold">{aluno.nome}</td>
                    <td>{aluno.cpf}</td>
                    <td>{aluno.telefone || '-'}</td>
                    <td>{aluno.nascimento ? new Date(aluno.nascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '-'}</td>
                    <td>
                      <span className={`badge fit-badge ${aluno.status === 'Ativo' ? 'fit-badge-success' : 'fit-badge-danger'}`}>
                        {aluno.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(aluno)} className="btn btn-sm btn-outline-warning mr-2" title="Editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(aluno.id)} className="btn btn-sm btn-outline-danger" title="Excluir">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredAlunos.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">Nenhum aluno encontrado.</td>
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

export default AlunosPage;
