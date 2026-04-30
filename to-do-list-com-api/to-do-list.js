// Pega elementos do HTML
let digitar = document.querySelector('#digitar') // input
let adicionar = document.querySelector('#adicionar') // botão
let lista = document.querySelector('#lista') // ul (lista)

// Quando clicar no botão → executa a função add()
adicionar.addEventListener('click', add)


// Função que cria um item na tela (li)
function criarItem(tarefa) {

    let item = document.createElement('li') // cria <li>
    let botao = document.createElement('button') // cria botão ❌

    botao.textContent = '❌'
    item.textContent = tarefa.texto // mostra o texto da tarefa

    lista.appendChild(item) // adiciona na lista
    item.appendChild(botao) // adiciona botão dentro do item


    // 👉 Quando clicar na tarefa → marcar como concluída
    item.addEventListener('click', async function() {

        // muda visual (risca ou não)
        item.classList.toggle('marcar')

        // chama API para atualizar no banco
        await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                texto: tarefa.texto,
                concluida: !tarefa.concluida // inverte (true/false)
            })
        })

        // recarrega lista atualizada
        carregarTarefas()
    })


    // 👉 Quando clicar no ❌ → deletar tarefa
    botao.addEventListener('click', async function(e) {

        e.stopPropagation() // evita ativar o clique do item

        // chama API para deletar
        await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
            method: 'DELETE'
        })

        // recarrega lista
        carregarTarefas()
    })


    // 👉 Se já estiver concluída no banco, já mostra riscada
    if(tarefa.concluida) {
        item.classList.add('marcar')
    }
}


// 👉 Função que adiciona nova tarefa
async function add() {

    let texto = digitar.value // pega o texto digitado

    // evita vazio
    if(texto.trim() === '') {
        window.alert('Digite algo!')
        return
    }

    // envia para API salvar
    await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texto })
    })

    // atualiza lista
    await carregarTarefas()

    // limpa input
    digitar.value = ''
    digitar.focus()
}


// 👉 Carrega tarefas quando abre a página
carregarTarefas()


// 👉 Função que busca tarefas da API
async function carregarTarefas() {

    // pede dados para API
    const resposta = await fetch('http://localhost:3000/tarefas')

    // transforma em JSON
    const dados = await resposta.json()

    lista.innerHTML = '' // limpa lista

    // cria cada item na tela
    dados.forEach(tarefa => {
        criarItem(tarefa)
    })
}
