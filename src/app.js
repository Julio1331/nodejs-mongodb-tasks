//este archivo se encarga de la configuracion de la aplicacion 

import express from 'express';//iporta express para levantar el servidor
import {create} from "express-handlebars";
// import exphbs from 'express-handlebars'//importo el modulo para poder configurarlo, como hay 
                                    //varios motores de plantillas se debe importar y configurar el que se va a usar, en este caso hadlebars
import indexRoutes from './routes/index.routes;'//en caso de no ser una funcion propia de express o
                                    // cualquier otro modulo 
import path from 'path';//modulo para usar rutas independientemente de la plataforma, windows, linux, etc
import morgan from 'morgan';//middleware que permite ver las peticiones que se estan realizando
import exp from 'constants';
const app = express();

app.set('views',path.join(__dirname,'views'));//se puede usar directamente __dirname pero suele dar problemas entre plataformas
                // por eso se recomienda usar el modulo path incluido en express
                //Lo que se hace en esa linea es setear una propiedad en app la cual se llama views 
                //y lo que tiene adentro es la ruta de la carpeta views 
// app.engine(
//     ".hbs",
//     exphbs({//el modulo es exphbs y entre los parentesis va el objeto
//         layoutsDir: path.join(app.get('views'), 'layouts'),
//         defaultLayout: 'main',
//         extname: '.hbs',//extension del archivo donde estan programadas las vistas
// }))//con .engine se le dice que motor de plantillas se va a utilizar
// app.set('view engine', '.hbs')


const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get("views"), "layouts"),
    // partialsDir: path.join(app.get("views"), "partials"),//esta linea debe agregarse si la carpeta partials tiene otro
                                                            //nombre por ej: porciones 
                                                            //partialsDir: path.join(app.get("views"), "porciones")
    defaultLayout:'main'
  });
app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

//middlewares
app.use(morgan('dev'));//este codigo muestra en consola la peticion realizada, la respuesta y el tiempo
app.use(express.urlencoded({extended: false}));//este middleware se usa para que los datos enviados por 
                        //POST puedan ser convertidos a json

// Routes
app.use(indexRoutes);//de esta forma express usa lo que se esta importando como indexRoutes


//static files
app.use(express.static(path.join(__dirname, "public")));
export default app;