// Importa a conexão com o banco (Prisma)
import { prisma } from '../db.js'


// =========================
// GET → BUSCAR TAREFAS
// =========================
export async function listar(req, res) {

    // Busca TODAS as tarefas no banco
    const tarefas = await prisma.tarefa.findMany({
        orderBy: {
            createdAt: 'asc' // ordena da mais antiga pra mais nova
        }
    })

    // Envia as tarefas para o frontend (to-do-list)
    res.json(tarefas)
}



// =========================
// POST → CRIAR TAREFA
// =========================
export async function criar(req, res) {

    // Pega o texto enviado pelo frontend
    const { texto } = req.body

    // Validação simples (não deixa vazio)
    if (!texto) {
        return res.json({ mensagem: "Texto é obrigatório" })
    }

    // Cria uma nova tarefa no banco
    const nova = await prisma.tarefa.create({
        data: { texto } // salva só o texto (concluida já é false por padrão)
    })

    // Retorna a tarefa criada
    res.json(nova)
}



// =========================
// PUT → ATUALIZAR TAREFA
// =========================
export async function atualizar(req, res) {

    // Pega o ID da URL (ex: /tarefas/123)
    const { id } = req.params

    // Pega os dados enviados pelo frontend
    const { texto, concluida } = req.body

    // Atualiza a tarefa no banco
    const atualizada = await prisma.tarefa.update({
        where: { id }, // qual tarefa atualizar
        data: { texto, concluida } // o que atualizar
    })

    // Retorna a tarefa atualizada
    res.json(atualizada)
}



// =========================
// DELETE → DELETAR TAREFA
// =========================
export async function deletar(req, res) {

    // Pega o ID da URL
    const { id } = req.params

    // Remove a tarefa do banco
    await prisma.tarefa.delete({
        where: { id }
    })

    // Retorna mensagem de sucesso
    res.json({ mensagem: "Deletado com sucesso" })
}