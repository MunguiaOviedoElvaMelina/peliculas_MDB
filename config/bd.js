const mongoose = require('mongoose');
const init_db = `mongodb://127.0.0.1:27017/movies` 
module.exports = ()=> {
    const connect = ()=> {
        mongoose.connect(
            init_db, {
            },
            (err)=>{
                if (err){
                    console.log('DB:ERROR!', err);
                }else{
                    console.log('CONEXIÓN CORRECTA');
                }
            }
        )
    }
    connect();
}
