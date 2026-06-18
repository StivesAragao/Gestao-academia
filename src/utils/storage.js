// Helper file to handle localStorage operations for CRUD data

const DEFAULT_ALUNOS = [
  { id: 1, nome: "João Pedro Silva", cpf: "123.456.789-00", telefone: "(61) 98888-7777", nascimento: "1995-04-12", status: "Ativo" },
  { id: 2, nome: "Maria Eduarda Santos", cpf: "987.654.321-11", telefone: "(61) 99999-8888", nascimento: "1998-09-23", status: "Ativo" },
  { id: 3, nome: "Lucas Oliveira Ramos", cpf: "456.789.123-22", telefone: "(61) 97777-6666", nascimento: "2000-01-30", status: "Inativo" }
];

const DEFAULT_MATRICULAS = [
  { id: 1, alunoId: 1, plano: "Black", dataInicio: "2026-01-10", status: "Ativo" },
  { id: 2, alunoId: 2, plano: "Smart", dataInicio: "2026-03-15", status: "Ativo" },
  { id: 3, alunoId: 3, plano: "Fit", dataInicio: "2025-11-01", status: "Cancelado" }
];

const DEFAULT_DESPESAS = [
  { id: 1, descricao: "Aluguel do Galpão", valor: 3500.00, dataVencimento: "2026-06-10", categoria: "Infraestrutura", status: "Pago" },
  { id: 2, descricao: "Energia Elétrica", valor: 850.40, dataVencimento: "2026-06-15", categoria: "Utilidades", status: "Pago" },
  { id: 3, descricao: "Manutenção de Esteiras", valor: 600.00, dataVencimento: "2026-06-25", categoria: "Manutenção", status: "Pendente" },
  { id: 4, descricao: "Marketing Digital (Redes Sociais)", valor: 450.00, dataVencimento: "2026-06-20", categoria: "Marketing", status: "Pendente" }
];

const DEFAULT_RECEITAS = [
  { id: 1, descricao: "Mensalidade - João Pedro", valor: 119.90, dataRecebimento: "2026-06-10", categoria: "Mensalidades", status: "Recebido" },
  { id: 2, descricao: "Mensalidade - Maria Eduarda", valor: 99.90, dataRecebimento: "2026-06-15", categoria: "Mensalidades", status: "Recebido" },
  { id: 3, descricao: "Venda de Whey Protein", valor: 150.00, dataRecebimento: "2026-06-14", categoria: "Vendas", status: "Recebido" },
  { id: 4, descricao: "Avaliação Física - Lucas Oliveira", valor: 80.00, dataRecebimento: "2026-06-05", categoria: "Serviços", status: "Recebido" }
];

export const initDatabase = () => {
  if (!localStorage.getItem("fitceub_alunos")) {
    localStorage.setItem("fitceub_alunos", JSON.stringify(DEFAULT_ALUNOS));
  }
  if (!localStorage.getItem("fitceub_matriculas")) {
    localStorage.setItem("fitceub_matriculas", JSON.stringify(DEFAULT_MATRICULAS));
  }
  if (!localStorage.getItem("fitceub_despesas")) {
    localStorage.setItem("fitceub_despesas", JSON.stringify(DEFAULT_DESPESAS));
  }
  if (!localStorage.getItem("fitceub_receitas")) {
    localStorage.setItem("fitceub_receitas", JSON.stringify(DEFAULT_RECEITAS));
  }
};

export const getCollection = (key) => {
  initDatabase();
  const data = localStorage.getItem(`fitceub_${key}`);
  return data ? JSON.parse(data) : [];
};

export const saveCollection = (key, data) => {
  localStorage.setItem(`fitceub_${key}`, JSON.stringify(data));
};
