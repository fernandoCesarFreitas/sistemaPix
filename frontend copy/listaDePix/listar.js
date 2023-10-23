let form = document.getElementById('formulario');
let nome = document.getElementById('nome');
let radioButtons = document.querySelectorAll('input[type="radio"]');
let corpoTabela = document.getElementById('corpo-tabela');
let usuarioSelect = document.getElementById('usuarios');
 
async function getUser () {
    let response = await fetch('http://localhost:3000/lista');
    let usuarios = await response.json();
    return usuarios;
  }

  async function setUser () {
    let usuarios = await getUser();
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    usuarioSelect.appendChild(selectOption);
  
    for (let usuario of usuarios) {
      let option = document.createElement('option');
      option.value = usuario.id;
      option.innerText = usuario.name;
      usuarioSelect.appendChild(option);
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    let selectedRadio = document.querySelector('input[name="opcao"]:checked');
    let tipo = selectedRadio ? selectedRadio.value : null;

    if (!usuarios.value || !tipo) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let payload = {
        nome: usuarios.value,
        tipo: tipo
    };

    fetch('http://localhost:3000/pix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        buscarUsuarios(data);
    })
    .catch(error => console.error(error));
});

async function buscarUsuarios(resultado) {
    corpoTabela.innerHTML = ''; // Limpa a tabela antes de listar os novos resultados

    // let resposta = await fetch('http://localhost:3000/pix');
    let pixs = await resultado

    for (let pix of pixs) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td');
        let tdCreate = document.createElement('td');
        let tdUpdate = document.createElement('td');
        let tdEfetuador = document.createElement('td');
        let tdDestinatario = document.createElement('td');

        tdId.innerText = pix.id;
        tdNome.innerText = pix.value;
        tdCreate.innerText = pix.createdAt;
        tdUpdate.innerText = pix.updatedAt;
        tdEfetuador.innerText = pix.recipient.name;
        tdDestinatario.innerText = pix.sender.name;

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdCreate);
        tr.appendChild(tdUpdate);
        tr.appendChild(tdEfetuador);
        tr.appendChild(tdDestinatario);

        corpoTabela.appendChild(tr);
    }
}

setUser();
