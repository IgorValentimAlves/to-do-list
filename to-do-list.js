// Pegando os elementos da tela
let digitar = document.querySelector('#digitar')
let adicionar = document.querySelector('#adicionar')
let lista = document.querySelector('#lista')

// Quando clicar no botão, adiciona uma tarefa
adicionar.addEventListener('click', add)

// Aqui ficam todas as tarefas
let dados = []

// Cria uma tarefa na tela
function criarItem(tarefa) {
    let item = document.createElement('li')
    let botao = document.createElement('button')
    botao.textContent = '❌'
    item.textContent = tarefa.texto
    lista.appendChild(item)
    item.appendChild(botao)

    // Quando clicar na tarefa, marca ou desmarca como concluída
    item.addEventListener('click', function() {
        this.classList.toggle('marcar')
        
        // Atualiza no array de tarefas
        tarefa.concluida = !tarefa.concluida

        // Salva no navegador
        localStorage.setItem('tarefa', JSON.stringify(dados))
    })

    // Quando clicar no botão ❌, remove a tarefa
    botao.addEventListener('click', function(e) {
        e.stopPropagation()

        item.remove()

        // Remove também do array
        dados = dados.filter(function(t){
            return t !== tarefa
        })

        // Atualiza o que está salvo
        localStorage.setItem('tarefa', JSON.stringify(dados))
    }) 

    // Se já estiver concluída, mantém riscada ao carregar
    if(tarefa.concluida) {
        item.classList.add('marcar')
    }
}


// Função que roda quando adiciona uma nova tarefa
function add() {
    let tarefa = digitar.value

    // Evita adicionar tarefa vazia
    if(tarefa.trim() === '') {
        window.alert('Digite algo!')
        return
    }

    // Cria o modelo da tarefa
    let novaTarefa = {
        texto: tarefa,
        concluida: false
    }

    dados.push(novaTarefa)

    // Salva no navegador
    localStorage.setItem('tarefa', JSON.stringify(dados))

    // Mostra na tela
    criarItem(novaTarefa)

    digitar.value = ''
    digitar.focus()
    
    
}

// Pega o que já estava salvo no navegador
let salvos = localStorage.getItem('tarefa')

if (salvos) {
    dados = JSON.parse(salvos)
}

// Recria as tarefas na tela quando a página carrega
dados.forEach(function(tarefa) {
    criarItem(tarefa)
})

