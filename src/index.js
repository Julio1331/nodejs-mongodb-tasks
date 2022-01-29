//este archivo corresponde al arranque de la aplicacion 
import app from './app';//acá está importando la configuración de la aplicación
import './database';
import {PORT} from "./config";

app.listen(PORT);//estas dos lineas fueron agregadas en etapa de despliegue porque el PORT lo define heroku
console.log("Server on port: ", PORT);

// app.listen(3000)//arranca la aplicacion para que escuche en el puerto 3000 del localhost
// console.log('server on port 3000')