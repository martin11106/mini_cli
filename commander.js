const program = require('commander')
const fs = require('fs');
const chalk = require('chalk')
const figlet = require('figlet')
const shell = require('shelljs')
const inquirer = require('inquirer')
program.version('1.1.0', '-v, --version')

program
    .command('start')
    // .option('-p','--port','Crea el servidor en un puerto distinto')
    .description('Ejecuta la configuracion inicial del CLI')
    .action(function () {
        console.log(
            chalk.green(
                figlet.textSync(
                    `PEAR CLI `, { font: 'Standard', horizontalLayout: 'full' }) +
                `       
                  .++ooo+                     
                  .oshsyyyyo                     
                 /hhshhhyyyh                     
                 hshydyyysh/                     
                .hyhhyyyyhs.                     
                 yydhyyyys                       
               .-.ssoo+:.                        
               shs+:-.                           
              .ydhooos+.                         
              .hoso+++++y/--...                   
              :h+++++++++oooooso/.                
              yo+++++++++++++++os+               
              .+y++++++++++++++++ss              
                /y++++++++++++++++h.             
                :h++++++++++++++++y:             
                .h++++++++++++++++h.             
                 .y++++++++++++++s-              
                  ./oo++++++++oo/.               
                     .//++++//.  `
            )
        )

        // ACABA LA PRESENTACION
        shell.exec('npm install --save express')
        shell.exec('npm install --save socket.io')
        shell.exec('npm install --save http')
        try {
            fs.mkdirSync('public')

            fs.writeFile("./server.js", `
            var express = require("express");            
            var app = new express();
            var http = require("http").Server(app);
            var io = require("socket.io")(http);

            var port = 3000;

            app.use(express.static(__dirname + "/public" ));

            app.get('/',function(req,res){
            res.redirect('index.html');
            });

            io.on('connection',function(socket){

                console.log('Usuario conectado')    

                socket.on('test',function(imagen){
                    console.log('Funciona')
                })

            });

            http.listen(port,function(){
            console.log("Server running at port "+ port);
            });

            //RUTAS ADICIONALES

            ` , function (err) {
                if (err) {
                    return console.log(err);
                }              
                // console.log("The file was saved!");
              });




              fs.writeFile("./public/index.html", `
              <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PEAR CLI</title>
</head>
<body>
    <center>
        <h1>WELCOME TO PEAR CLI</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam impedit sunt, est delectus vero dolorem odit quaerat fugit ex quos repudiandae enim fuga, non voluptatum, labore amet consequatur facere fugiat.</p>
    </center>
</body>
</html>
            ` , function (err) {
                if (err) {
                    return console.log(err);
                }              
                // console.log("The file was saved!");
              });
        } catch (error) {
            console.log(error)
        }

    })

    program
    .command('create')    
    .description('Crea nuevos elementos  [view,route]')
    .action(function (accion,name) {
      switch (accion) {
        case 'view':
        
            try {
              
              fs.writeFile("./public/"+name+".html", `
              <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>`+name+`</title>
</head>
<body>
    <center>
        <h1>La vista `+name+` funciona</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam impedit sunt, est delectus vero dolorem odit quaerat fugit ex quos repudiandae enim fuga, non voluptatum, labore amet consequatur facere fugiat.</p>
    </center>
</body>
</html>
            ` , function (err) {
                if (err) {
                    return console.log(err);
                }              
                // console.log("The file was saved!");
              });
            } catch (error) {
              
            }
          break;

        case 'route':        
        inquirer.prompt([
          {
              name: 'file',
              type: 'input',
              message: 'A que archivo quieres que te mande la ruta?'
          }
      ])
          .then(answers => {                        
            shell.exec("echo app.get('/"+name+"',function(req,res){res.redirect('"+answers.file+".html');}); >> server.js")
          })

            
          break;
      
        default:
        console.log('opcion invalida')
          break;
      }
    })

    program
    .command('restart')    
    .description('Elimina todos los archivos y desinstala las dependencias para comenzar de nuevo')
    .action(function () {
      shell.exec('npm remove express')
        shell.exec('npm remove socket.io')
        shell.exec('npm remove http')

        var test = shell.exec('rm server.js')
        var test2 = shell.exec('rmdir /S /Q public')
        
        if(test.stderr.length>0){
          shell.exec('del server.js')
        }

        if(test2.stderr.length>0){
          shell.exec('rm -r public')
        }
    })

    program
    .command('run')    
    .description('Inicia el servidor')
    .action(function () {
      shell.exec('node server.js')
    })
    
program.parse(process.argv)