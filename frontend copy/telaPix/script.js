// Captura o formulário
let form = document.getElementById('formulario');

// let remetente = document.getElementById('remetente');

// let destinatario = document.getElementById('destinatario');

let valor = document.getElementById('valor');

let usuarioSelect = document.getElementById('remetente');

let destinatarioSelect = document.getElementById('destinatario');

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

setUser();


async function getDest () {
    let response = await fetch('http://localhost:3000/lista');
    let destinatario = await response.json();
    return destinatario;
  }

  async function setDest () {
    let destinatarios = await getDest();
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    destinatarioSelect.appendChild(selectOption);
  
    for (let destinatario of destinatarios) {
      let option = document.createElement('option');
      option.value = destinatario.id;
      option.innerText = destinatario.name;
      destinatarioSelect.appendChild(option);
    }
}

setDest();


// Adiciona um listener para o evento submit do formulário
form.addEventListener('submit',async (event) => {
    event.stopPropagation();//para nao recarregar a pagina
    event.preventDefault();
    console.log(remetente.value)
    console.log(destinatario.value)
    console.log(valor.value)    
    if (!remetente.value || !destinatario.value || !valor.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria um objeto FormData com os dados do formulário
    let payload = {
                remetente: remetente.value,
                destinatario: destinatario.value,
                valor: valor.value
            }
            
            console.log(payload)

    // Envia uma requisição POST para a API com o objeto JSON no corpo da requisição
    let resposta = await fetch('http://localhost:3000/realizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (resposta.ok) {// .ok 
        alert(`Transação criada com sucesso!`)
        window.location.href = '../home/index.html' //redireciona á pagina principal
    } else {
        alert('Problema ao efetuar a transação, verifique os dados e tente novamente.');
    }
});
