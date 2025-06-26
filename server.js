const express = require('express'); 

const path = require('path'); 

const app = express(); //creo una instancia  de una app con express.


const port = process.env.PORT || 3000; //defino el puerto en el que va a correr la app.

app.listen(port, (err) => { //le digo a la app que escuche en el puerto definido.

    if(err) throw new Error(err);
    console.log(`Server running on port ${port}`);
});



