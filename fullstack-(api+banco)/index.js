import "dotenv/config"
import express from 'express'
import cors from 'cors'
import tarefaRoutes from './src/routes/tarefa.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/tarefas', tarefaRoutes)

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})