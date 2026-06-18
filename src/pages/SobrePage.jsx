import React from "react";

function SobrePage() {
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-0 text-white font-weight-bold">Sobre o Sistema</h1>
          <p className="text-muted mb-0">Informações sobre a plataforma de gestão FitCeub.</p>
        </div>
      </div>

      <div className="card fit-card">
        <div className="fit-card-header">
          <h6 className="fit-card-title">Projeto Acadêmico CEUB</h6>
        </div>
        <div className="fit-card-body">
          <p className="lead text-white font-weight-bold">FitCeub v2.0</p>
          <p>
            Esta aplicação é um protótipo de sistema integrado de gestão para academias desenvolvido
            como projeto prático para a faculdade CEUB.
          </p>
          <p>
            O foco do projeto está na agilidade administrativa, permitindo a gestão financeira (Receitas e Despesas)
            e de alunos (Dados Cadastrais e Matrículas/Planos) em um painel responsivo, esteticamente agradável e
            intuitivo, inspirado na identidade visual da Smart Fit.
          </p>
          <hr style={{ borderColor: 'var(--fit-medium-grey)' }} />
          <h5 className="text-warning font-weight-bold mt-4">Tecnologias Utilizadas:</h5>
          <ul>
            <li>React 19 & Vite</li>
            <li>React Router DOM 7</li>
            <li>Bootstrap 4 (Estilização Base)</li>
            <li>CSS3 Personalizado (Black & Yellow Theme)</li>
            <li>FontAwesome Icons</li>
            <li>LocalStorage para persistência dos dados</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SobrePage;