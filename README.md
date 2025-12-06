# 📋 Anamnese Integrativa

Sistema completo para coleta e gerenciamento automático de anamnese médica integrativa.

## 🎯 Sobre o Projeto

A Anamnese Integrativa é um sistema web desenvolvido para facilitar a coleta, armazenamento e gestão de informações de anamnese médica de pacientes. O sistema oferece uma interface amigável e intuitiva para profissionais de saúde registrarem informações detalhadas sobre histórico médico, queixas, medicações, alergias e estilo de vida dos pacientes.

## ✨ Funcionalidades

- ✅ Formulário completo de anamnese com validação
- ✅ Coleta de dados pessoais do paciente
- ✅ Registro de histórico médico detalhado
- ✅ Gerenciamento de medicações e alergias
- ✅ Informações sobre estilo de vida e histórico familiar
- ✅ Visualização de todos os registros salvos
- ✅ Sistema de busca e exclusão de registros
- ✅ Interface responsiva e moderna
- ✅ API RESTful para integração

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **Body-Parser** - Middleware para parsing de requisições
- **CORS** - Middleware para controle de acesso

### Frontend
- **HTML5** - Estrutura da interface
- **CSS3** - Estilização com gradientes e animações
- **JavaScript ES6+** - Funcionalidades interativas
- **Fetch API** - Comunicação com o backend

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Wanderpsc/Anamnese-Integrativa.git
cd Anamnese-Integrativa
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

4. Acesse a aplicação no navegador:
```
http://localhost:3000
```

## 💻 Uso

### Interface do Usuário

1. **Nova Anamnese**: Preencha o formulário com os dados do paciente
   - Dados pessoais (nome, idade, gênero, contato)
   - Histórico médico (queixas, doenças anteriores, medicações)
   - Estilo de vida e histórico familiar

2. **Registros**: Visualize todos os registros salvos
   - Lista completa de anamneses
   - Opção de excluir registros
   - Atualização em tempo real

### API REST

O sistema oferece uma API RESTful para integração:

#### Endpoints Disponíveis

- `GET /api/health` - Verificar status da API
- `GET /api/anamnesis` - Listar todas as anamneses
- `GET /api/anamnesis/:id` - Buscar anamnese específica
- `POST /api/anamnesis` - Criar nova anamnese
- `PUT /api/anamnesis/:id` - Atualizar anamnese
- `DELETE /api/anamnesis/:id` - Excluir anamnese

#### Exemplo de Requisição

```javascript
// Criar nova anamnese
fetch('http://localhost:3000/api/anamnesis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    patientName: "João Silva",
    age: 35,
    gender: "masculino",
    chiefComplaint: "Dor de cabeça frequente"
  })
});
```

## 🔧 Estrutura do Projeto

```
Anamnese-Integrativa/
├── public/              # Arquivos estáticos do frontend
│   ├── index.html      # Página principal
│   ├── styles.css      # Estilos CSS
│   └── script.js       # JavaScript do cliente
├── server.js           # Servidor Express e API
├── package.json        # Dependências e scripts
├── .gitignore         # Arquivos ignorados pelo Git
├── LICENSE            # Licença do projeto
└── README.md          # Documentação

```

## 🛠️ Desenvolvimento

### Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Executar testes (quando disponíveis)
npm test
```

### Modo de Armazenamento

⚠️ **Importante**: Atualmente, o sistema utiliza armazenamento em memória. Os dados são perdidos quando o servidor é reiniciado. Para uso em produção, recomenda-se implementar integração com um banco de dados (MongoDB, PostgreSQL, MySQL, etc.).

## 🔐 Segurança

- Validação de dados no frontend e backend
- Sanitização de entradas
- CORS configurado
- Proteção contra XSS

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Implementar banco de dados persistente
- [ ] Adicionar autenticação de usuários
- [ ] Sistema de busca avançada
- [ ] Exportação de dados (PDF, Excel)
- [ ] Relatórios e estatísticas
- [ ] Histórico de edições
- [ ] Upload de arquivos (exames, documentos)
- [ ] Integração com sistemas de saúde
- [ ] Aplicativo móvel

## 📄 Licença

Este projeto está licenciado sob a Boost Software License 1.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Wanderpsc** - [GitHub](https://github.com/Wanderpsc)

## 🙏 Agradecimentos

- Desenvolvido com o suporte do GitHub Copilot
- Inspirado em necessidades reais de profissionais de saúde
- Comunidade open source

## 📞 Contato

Para dúvidas, sugestões ou contribuições, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ para a comunidade de saúde integrativa**
