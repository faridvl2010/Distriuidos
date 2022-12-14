const localDate=require('localDate')
const {Router, request} = require ('express');
const router = Router();
const os = require('os');
const path = require('path');
const fs = require('fs');
let messages = [];

router.get('/info', (req, res) =>{
    var hostname=os.hostname();
    var today= new Date();
    var now=today.toLocaleString();
    var file_json={"name":hostname, "hora":now}
    res.send(file_json)
    console.log(file_json)
});

router.get('/info2',(req, res) =>{
    console.log(__dirname)
    console.log(process.cwd()) 
    let ruta = process.cwd()
    fs.readdir(ruta, function (err, archivos) {
    if (err) {
    onError(err);
    return;
    }
    let file_json={"ruta":process.cwd(), "archivos":archivos}
    res.send(file_json)
    });
})

router.post('/info3',(req, res) =>{
    const obj = req.body;
    
    messages.push(obj);
   

    console.log('\nEl cliente ' + ": " + req.socket.remoteAddress + " dice: " +new localDate());
    let response = {}
    
   
    messages.forEach(function(elemento) {
        let fecha = new Date(elemento.fecha)
        var today= new Date();
        console.log(elemento);
       console.log("Diferencia de tiempo envio-recepcion: " + (Math.abs(fecha.getMilliseconds()-today.getMilliseconds()))+" milisegundos"  )
       //console.log("Diferencia de tiempo en milisegundos: " + (Math.abs(obj.fecha-today))  )
        response.data=elemento;
       response.diferencia=(Math.abs(fecha.getMilliseconds()-today.getMilliseconds()))
    });
    res.send(response)
});
module.exports=router   ;

