import React, { useState, useEffect } from 'react';
import { getCollection, saveCollection } from '../utils/storage';

function ReceitasPage() {
  const [receitas, setReceitas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataRecebimento, setDataRecebimento] = useState('');
  const [categoria, setCategoria] = useState('Mensalidades');
  const [status, setStatus] = useState('Recebido');
  const [search, setSearch] = useState('');

  // Editing state
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setReceitas(getCollection('receitas'));
  }, []);

  const clearForm = () => {
    setDescricao('');
    setValor('');
    setDataRecebimento('');
    setCategoria('Mensalidades');
    setStatus('Recebido');
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao || !valor || !dataRecebimento) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    let updatedList;
    if (editId) {
      updatedList = receitas.map(r => 
        r.id === editId 
          ? { ...r, descricao, valor: parseFloat(valor), dataRecebimento, categoria, status } 
          : r
      );
    } else {
      const newReceita = {
        id: receitas.length > 0 ? Math.max(...receitas.map(r => r.id)) + 1 : 1,
        descricao,
        valor: parseFloat(valor),
        dataRecebimento,
        categoria,
        status
      };
      updatedList = [...receitas, newReceita];
    }

    setReceitas(updatedList);
    saveCollection('receitas', updatedList);
    clearForm();
  };

  const handleEdit = (receita) => {
    setEditId(receita.id);
    setDescricao(receita.descricao);
    setValor(receita.valor.toString());
    setDataRecebimento(receita.dataRecebimento);
    setCategoria(receita.categoria);
    setStatus(receita.status);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      const updatedList = receitas.filter(r => r.id !== id);
      setReceitas(updatedList);
      saveCollection('receitas', updatedList);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const filteredReceitas = receitas.filter(r =>
    r.descricao.toLowerCase().includes(search.toLowerCase()) ||
    r.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-white font-weight-bold">Manter Receitas</h1>
          <p className="text-muted mb-0">Gestão das entradas financeiras e mensalidades.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-fit-primary">
            <i className="fas fa-plus mr-2"></i> Nova Receita
          </button>
        )}
      </div>

      {showForm && (
        <div className="card fit-card mb-4">
          <div className="fit-card-header">
            <h6 className="fit-card-title">{editId ? 'Editar Receita' : 'Cadastrar Receita'}</h6>
            <button onClick={clearForm} className="btn btn-sm btn-fit-secondary">
              <i className="fas fa-times"></i> Fechar
            </button>
          </div>
          <div className="fit-card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Descrição *</label>
                  <input
                    type="text"
                    className="form-control fit-input"
                    placeholder="Ex: Mensalidade Aluno X"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6 mb-3">
                  <label className="fit-label">Valor (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control fit-input"
                    placeholder="0.00"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Data de Recebimento *</label>
                  <input
                    type="date"
                    className="form-control fit-input"
                    value={dataRecebimento}
                    onChange={(e) => setDataRecebimento(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Categoria</label>
                  <select
                    className="form-control fit-select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="Mensalidades">Mensalidades</option>
                    <option value="Vendas">Venda de Produtos</option>
                    <option value="Serviços">Avaliações/Personal</option>
                    <option value="Outros">Outras Receitas</option>
                  </select>
                </div>
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Status de Recebimento</label>
                  <select
                    className="form-control fit-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Recebido">Recebido</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-fit-primary mr-2">
                  <i className="fas fa-save mr-2"></i> {editId ? 'Salvar Alterações' : 'Salvar Receita'}
                </button>
                <button type="button" onClick={clearForm} className="btn btn-fit-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEITAS LIST */}
      <div className="card fit-card">
        <div className="fit-card-header d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="fit-card-title">Histórico de Receitas</h6>
          <div className="mt-2 mt-md-0" style={{ minWidth: '250px' }}>
            <input
              type="text"
              className="form-control fit-input form-control-sm"
              placeholder="Buscar por descrição ou categoria..."
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
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Data de Recebimento</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceitas.map(r => (
                  <tr key={r.id}>
                    <td>#{r.id}</td>
                    <td className="text-white font-weight-bold">{r.descricao}</td>
                    <td className="text-success font-weight-bold">+{formatCurrency(r.valor)}</td>
                    <td>{new Date(r.dataRecebimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                    <td>{r.categoria}</td>
                    <td>
                      <span className={`badge fit-badge ${r.status === 'Recebido' ? 'fit-badge-success' : 'fit-badge-warning'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(r)} className="btn btn-sm btn-outline-warning mr-2" title="Editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(r.id)} className="btn btn-sm btn-outline-danger" title="Excluir">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredReceitas.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">Nenhuma receita encontrada.</td>
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

export default ReceitasPage;
