import { config } from 'dotenv'
config();


export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crud-mongo'//el o condicional esta 
//para que cuando MONGODB_URI no tenga arguemnto o no exista se conexte a otra bd por defecto, en este caso es la
//misma crud-mongo, pero la funcion seria esa
//tambien se puede exportar el puerto y asi dejar url y puerto de conexion ocultos
// export const PORT = process.env.PORT || 3000; de esta forma va el oculto y uno por defecto

//este archivo de configuracion se utiliza para usar variables de entorno
//cuando se sube el proyecto a github por ejemplo y queda como publico, por seguridad las rutas de las
//bases de datos no se suben porque sino cualquiera que tenga acceso al repositorio tiene acceso a la base de datos
//lo que se hace es:
//en el archivo .env se coloca la url de la base de datos, este archivo es al que se le da gitignore para que
//      no se suba al repositorio
//luego en un archivo de configuracion (config.js) se importa el modulo dotenv de node para poder usar
//      variables de entorno y se declara la variable que será utilizada como argumento para
//      la funcion connect de mongoose y se exporta como constante
//el paso final es importarla en el archivo donde se realiza la conexion con la base de datos,
//      se debe tener en cuenta que debe ser llamado o importado al principio de la ejecucion del proyecto