import React, { useState, useEffect } from 'react';
import { getCollection, saveCollection } from '../utils/storage';

function DespesasPage() {
  const [despesas, setDespesas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [categoria, setCategoria] = useState('Infraestrutura');
  const [status, setStatus] = useState('Pendente');
  const [search, setSearch] = useState('');

  // Editing state
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setDespesas(getCollection('despesas'));
  }, []);

  const clearForm = () => {
    setDescricao('');
    setValor('');
    setDataVencimento('');
    setCategoria('Infraestrutura');
    setStatus('Pendente');
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao || !valor || !dataVencimento) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    let updatedList;
    if (editId) {
      updatedList = despesas.map(d => 
        d.id === editId 
          ? { ...d, descricao, valor: parseFloat(valor), dataVencimento, categoria, status } 
          : d
      );
    } else {
      const newDespesa = {
        id: despesas.length > 0 ? Math.max(...despesas.map(d => d.id)) + 1 : 1,
        descricao,
        valor: parseFloat(valor),
        dataVencimento,
        categoria,
        status
      };
      updatedList = [...despesas, newDespesa];
    }

    setDespesas(updatedList);
    saveCollection('despesas', updatedList);
    clearForm();
  };

  const handleEdit = (despesa) => {
    setEditId(despesa.id);
    setDescricao(despesa.descricao);
    setValor(despesa.valor.toString());
    setDataVencimento(despesa.dataVencimento);
    setCategoria(despesa.categoria);
    setStatus(despesa.status);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      const updatedList = despesas.filter(d => d.id !== id);
      setDespesas(updatedList);
      saveCollection('despesas', updatedList);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const filteredDespesas = despesas.filter(d =>
    d.descricao.toLowerCase().includes(search.toLowerCase()) ||
    d.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-white font-weight-bold">Manter Despesas</h1>
          <p className="text-muted mb-0">Gestão das saídas financeiras e custos operacionais.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-fit-primary">
            <i className="fas fa-plus mr-2"></i> Nova Despesa
          </button>
        )}
      </div>

      {showForm && (
        <div className="card fit-card mb-4">
          <div className="fit-card-header">
            <h6 className="fit-card-title">{editId ? 'Editar Despesa' : 'Cadastrar Despesa'}</h6>
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
                    placeholder="Ex: Aluguel do Mês"
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
                  <label className="fit-label">Data de Vencimento *</label>
                  <input
                    type="date"
                    className="form-control fit-input"
                    value={dataVencimento}
                    onChange={(e) => setDataVencimento(e.target.value)}
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
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Utilidades">Água/Luz/Internet</option>
                    <option value="Manutenção">Manutenção de Equipamentos</option>
                    <option value="Marketing">Marketing/Publicidade</option>
                    <option value="Salários">Salários/Colaboradores</option>
                    <option value="Outros">Outras Despesas</option>
                  </select>
                </div>
                <div className="form-group col-md-4 mb-3">
                  <label className="fit-label">Status do Pagamento</label>
                  <select
                    className="form-control fit-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pago">Pago</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-fit-primary mr-2">
                  <i className="fas fa-save mr-2"></i> {editId ? 'Salvar Alterações' : 'Salvar Despesa'}
                </button>
                <button type="button" onClick={clearForm} className="btn btn-fit-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESPESAS LIST */}
      <div className="card fit-card">
        <div className="fit-card-header d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="fit-card-title">Histórico de Despesas</h6>
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
                  <th>Data de Vencimento</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredDespesas.map(d => (
                  <tr key={d.id}>
                    <td>#{d.id}</td>
                    <td className="text-white font-weight-bold">{d.descricao}</td>
                    <td className="text-danger font-weight-bold">-{formatCurrency(d.valor)}</td>
                    <td>{new Date(d.dataVencimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                    <td>{d.categoria}</td>
                    <td>
                      <span className={`badge fit-badge ${d.status === 'Pago' ? 'fit-badge-success' : 'fit-badge-danger'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(d)} className="btn btn-sm btn-outline-warning mr-2" title="Editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-outline-danger" title="Excluir">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDespesas.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">Nenhuma despesa encontrada.</td>
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

export default DespesasPage;
