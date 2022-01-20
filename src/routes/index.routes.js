import { Router } from 'express'  //importa la funcion Router que ya viene incluida dentro de express

const router = Router()           // como es una funcion tiene que ser ejecutada

import {
    createTask,
    deleteTask,
    editTask, 
    renderTaskEdit, 
    renderTasks, 
    taskToggleDone
} from '../controllers/tasks.controller'//importo todas las funciones que usan las rutas 

router.get('/', renderTasks)

router.post('/tasks/add', createTask)

router.get("/tasks/:id/edit", renderTaskEdit)

router.post('/tasks/:id/edit', editTask)

router.get('/tasks/:id/delete', deleteTask)

router.get('/tasks/:id/toggledone', taskToggleDone)

export default router//este objeto es que que se va a importar desde otro archivo cuando se use la sentencia import