const pessoas = [];
var isDarkMode = false;


function viaCepRequest(event){
    event.preventDefault();
    var cep = document.getElementById("input-cep").value;
    var url = `https://viacep.com.br/ws/${cep}/json`;

    fetch(url)
        .then((response) => {
           if(!response.ok) throw new Error(`Error. ${response.status}`);
           return response.json(); 
        })
        .then((data) => {
            if(!("erro" in data)){
                document.getElementById("input-rua").value = data.logradouro;
                document.getElementById("input-numero").value = data.numero;                
                document.getElementById("input-bairro").value = data.bairro;
                document.getElementById("input-cidade").value = data.localidade;
                document.getElementById("input-estado").value = data.uf;
            }
            else{
                alert("CEP não encontrado!");
            }
        })
        .catch((err) => console.log(err.message));
}


function cadastrarPessoa(event) {
  event.preventDefault();
  const pessoa = {
    id: Math.floor(Math.random() * (100 - 1) - 1),
    nome: document.getElementById("input-nome").value,
    sobrenome: document.getElementById("input-sobrenome").value,
    email: document.getElementById("input-email").value,
    endereco: {
      cep: document.getElementById("input-cep").value,
      logradouro: document.getElementById("input-rua").value,
      numero: document.getElementById("input-numero").value,
      pontoReferencia: document.getElementById("input-referencia").value,
      bairro: document.getElementById("input-bairro").value,
      cidade: document.getElementById("input-cidade").value,
      estado: document.getElementById("input-estado").value,
    },
  };

  pessoas.push(pessoa);
  alert(`${pessoa.nome} cadastrado com sucesso!`);
  limparCampos();
  atualizarTabela();
}

function limparCampos() {
  document.getElementById("input-nome").value = "";
  document.getElementById("input-sobrenome").value = "";
  document.getElementById("input-email").value = "";
  document.getElementById("input-cep").value = "";
  document.getElementById("input-rua").value = "";
  document.getElementById("input-numero").value = "";
  document.getElementById("input-referencia").value = "";
  document.getElementById("input-bairro").value = "";
  document.getElementById("input-cidade").value = "";
  document.getElementById("input-estado").value = "";
  return;
}

function atualizarTabela() {
  var tableBody = document.getElementById("table-body");
  if (pessoas.length === 0) {
    tableBody.innerHTML = `<h3>Sem registros</h3>`;
    return;
  }

  var novoTableBody = "";
  pessoas.map((p, i) => {
    novoTableBody += `<tr>
                            <th scope="row">${p.id}</th>
                            <td>${p.nome}</td>
                            <td>${p.sobrenome}</td>
                            <td>${p.email}</td>
                            <td style="text-align: center;">
                                <button class="btn btn-warning m-0 " onclick="editarRegistro('${i}')">Editar</button>
                                <button class="btn btn-danger m-0" onclick="excluirRegistro('${i}')">Excluir</button>
                            </td>                            
                        </tr>`;
  });

  tableBody.innerHTML = novoTableBody;
}

function excluirRegistro(index) {
  var pessoa = pessoas[index];
  pessoas.splice(index, 1);
  alert(`Registro ${pessoa.id} | ${pessoa.nome} removido com sucesso!`);
  atualizarTabela();
}

function editarRegistro(index) {
  var pessoa = pessoas[index];

  document.getElementById("input-nome").value = pessoa.nome;
  document.getElementById("input-sobrenome").value = pessoa.sobrenome;
  document.getElementById("input-email").value = pessoa.email;
  document.getElementById("input-cep").value = pessoa.endereco.cep;
  document.getElementById("input-rua").value = pessoa.endereco.logradouro;
  document.getElementById("input-numero").value = pessoa.endereco.numero;
  document.getElementById("input-referencia").value =
    pessoa.endereco.pontoReferencia;
  document.getElementById("input-bairro").value = pessoa.endereco.bairro;
  document.getElementById("input-cidade").value = pessoa.endereco.cidade;
  document.getElementById("input-estado").value = pessoa.endereco.estado;

  var botao = document.getElementById("btn-confirmar");
  botao.removeAttribute("type");
  botao.setAttribute("class", "btn btn-success");
  botao.innerHTML = "Salvar";
  botao.onclick = function (event) {
    event.preventDefault();
    atualizarRegistro(pessoa);
  };
}

function atualizarRegistro(pessoa) {
  var index = pessoas.findIndex((p) => p.id === pessoa.id);

  pessoas[index] = {
    ...pessoa,
    nome: document.getElementById("input-nome").value,
    sobrenome: document.getElementById("input-sobrenome").value,
    email: document.getElementById("input-email").value,
    endereco: {
      cep: document.getElementById("input-cep").value,
      logradouro: document.getElementById("input-rua").value,
      numero: document.getElementById("input-numero").value,
      pontoReferencia: document.getElementById("input-referencia").value,
      bairro: document.getElementById("input-bairro").value,
      cidade: document.getElementById("input-cidade").value,
      estado: document.getElementById("input-estado").value,
    },
  };

  alert(`Registro ${pessoa.id} atualizado com sucesso!`);
  limparCampos();
  atualizarTabela();
  estadoInicialBotao();
}

function estadoInicialBotao() {
  var botao = document.getElementById("btn-confirmar");
  botao.setAttribute("type", "submit");
  botao.setAttribute("class", "btn btn-primary");
  botao.innerHTML = "Cadastrar";
  botao.onclick = function () {
    return;
  };
}

function cancelar(event){
    event.preventDefault();
    limparCampos();
    estadoInicialBotao();
}

function setDarkMode(){
    if(!isDarkMode){
        var body = document.getElementsByTagName('body')[0];
        body.setAttribute("class", "bg-dark text-light");
        var nav = document.getElementsByTagName('nav')[0];
        nav.setAttribute("class", "navbar navbar-expand-lg navbar-dark bg-black");
        var table = document.getElementsByTagName('table')[0];
        table.setAttribute("class", "table text-light");
        document.getElementById("controle-dark-mode").innerText = "Disable";
        isDarkMode = true;
        return;
    }

    var body = document.getElementsByTagName('body')[0];
    body.removeAttribute("class");
    var nav = document.getElementsByTagName('nav')[0];
    nav.setAttribute("class", "navbar navbar-expand-lg navbar-dark bg-primary");
    var table = document.getElementsByTagName('table')[0];
    table.setAttribute("class", "table");
    document.getElementById("controle-dark-mode").innerText = "Active";
    isDarkMode = false;
}
    








/*var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = '#333';*/




