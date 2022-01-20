//Este archivo se crea para respetar el patron de arquitectura  MODELO VISTA CONTROLADOR
//en este archivo van todas las funciones de las rutas, lo que vendria a ser el controlador

import Task from '../models/Task'

//cada funcion se exporta por separado como una constante por eso la estructura es:
//export const nombreFuncion = funcion flecha usada en cada ruta


export const renderTasks = async (req, res) => {//respuesta que se envia cuando el request es la raiz
    //el async es por la consulta a la bd que se hace en el index

    const tasks = await Task.find().lean()//en esta linea trae todos los elementos guardados en la base de datos, tasks es un arreglo de objetos de mongodb
    //sin el .lean() los importa como objeto del tipo mongodb y con el .lean() los importa como objeto de js

    res.render('index', { tasksp: tasks })//aca le estoy diciendo que al index le voy a pasar un objeto, dentro de ese objeto
    //hay una propiedad llamada tasksp y el valor de esa propiedad es tasks, donde 
    //tasks es justamente lo que obtengo de la consulta a la base de datos
    //tasksp es lo que tengo que llamar desde el index para poder acceder a los datos                             
}

export const createTask = async (req, res) => {//el async es por el await en la linea que guarda en la base de datos
    const task = Task(req.body)//esta linea queda afuera porque tambien uso la variable task dentro del catch y si 
    //estuviera dentro del try el catch no la vería. otra opcion seria repetir esta linea en el try y en el catch
    try {

        console.log('TaSkS: ', task.title + 'nuevo')
        const taskSaved = await task.save()//esta linea es la que guarda el objeto en la base de datos
        //es una funcion asincrona por eso si o si debe llevar el await
        //para poder usarla la conexion con la base da datos ya tiene que esta hecha
        console.log(taskSaved)
        res.redirect('/')
    } catch (error) {//en este caso para cualquier error se le agrega la palabra nuevo al title(ya que larga error si pasa)
        // pero debería verificarse que el error sea efectivamente el titulo repetido y que al agregar nuevo
        //al title no quede igual que otro title que ya se haya repetido antes.
        // en la descripcion tambien se agrega otro string 
        console.log('eRrOr: ', error)
        task.title = task.title + 'nuevo'
        task.description = task.description + '. Al momento de guardar esta tarea habia otra con el mismo title, por eso se le agrega "nuevo"'
        console.log('TaSkS: ', task.title)
        const taskSaved = await task.save()
        //console.log(document.getElementById("title").value)
        res.redirect('/')
    }
}

export const renderTaskEdit = async (req, res) => {//con edit/:id indico que despues de edit viene otra parte en la url
    // que puede ser cualquier cosa y que va a estar guardado en la variable id
    //FALTA HACER LA PETICION PARA PASAR AL EDIT.HBS CREO
    // console.log(req.params.id)
    const task = await Task.findById(req.params.id).lean()
    res.render('edit', { task })
    // res.render('edit',{tasks})
}

export const editTask = async (req, res) => {
    //console.log(req.body)
    //console.log(req.params.id)//con esta linea extraigo el parametro que viene en la url
    const { id } = req.params
    await Task.findByIdAndUpdate(id, req.body)//esta linea es la que hace la actualizacion
    res.redirect('/')
}

export const deleteTask = async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    res.redirect('/')
}

export const taskToggleDone = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    task.done = !task.done
    await task.save()
    res.redirect('/')
}
