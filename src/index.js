//este archivo corresponde al arranque de la aplicacion 
import app from './app'//acá está importando la configuración de la aplicación
import './database'

app.listen(3000)//arranca la aplicacion para que escuche en el puerto 3000 del localhost
console.log('server on port 3000')