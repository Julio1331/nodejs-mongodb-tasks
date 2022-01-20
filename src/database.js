import { connect } from 'mongoose'
import { MONGODB_URI } from './config'

console.log(MONGODB_URI);//en este caso si o si tiene que llevar el ; porque sino lo considera como
//nombre de la funcion asyncrona que sigue

(async () => {
    try {
        const db = await connect(MONGODB_URI);
        console.log('DB connected to', db.connection.name)
    } catch (error) {
        console.log('eRrOr', error)
    }
    console.log('works')
})();