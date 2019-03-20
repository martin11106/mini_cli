const  program =require('commander')
const fs = require('fs');
const chalk=require('chalk')
const figlet=require('figlet')
const shell=require('shelljs')
program
    .version('1.1.0','-v, --version')


program
.command('iniciar')
.action(function () {
  console.log(  
    chalk.green(
    figlet.textSync(
      `pear CLI `   ,{font:'Standard',horizontalLayout:'full'})
      )+
      `\n       
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
         .//++++//.  `);
         console.log('');
         
carpetas()
archivos()

})
program
.command('crear_model')
.description('esto crea un modelo')
.arguments('[env]')
.action(function (env) {
  model(env)
  })
  program
  .command('controller')
  .description('esto crea un controlador')
  .arguments('[env]')
  .action(function (env) {
    controller(env)
    })
  program
    .command("restart")
    .description("elimina todos los archivos")
    .arguments('[env]')
    .action(function (env) {
     eliminar()
      })
  program
  .command("database")
  .description("crea base de datos")
  .arguments('[env]')
  .action(function (env) {
    database(env)
     })
function database(env){
  fs.writeFile("./database/"+env+".js", 
  `const mongoose=require('mongoose')
  //esquema de base de datos
  
  const customerSchema=mongoose.Schema({
    
  })
  module.exports=mongoose.model(`+env+`,customerSchema)`, function (err) {
    if (err) {
        return console.log(err);
    }
 
    console.log("The file was saved!");
});
}
  function eliminar(){
    shell.exec('rm -r '+'controller')
    shell.exec('rm -r '+'database')
    shell.exec('rm -r '+'models')
    shell.exec('rm -r '+'view')
  }
    function controller(env){
      fs.writeFile("./controller/"+env+"Controller.js", 
      `'use strict'
      const `+env+` =use('./model/`+env+`')
      
      class `+env+`Controller {
       
        
      }
      
      module.exports = `+env+`Controller
      `, function (err) {
     
        if (err) {
            return console.log(err);
        }
      
        console.log("The file was saved!");
    });
    }


  function model(env){
    fs.writeFile("./models/"+env+".js", `'use strict'


    const Model = use('Model')
    
    class `+env+` extends Model {
        
    }
    
    module.exports = `+env+`
    `, function (err) {
      // la funcion es la que maneja lo que sucede despues de termine el evento
      if (err) {
          return console.log(err);
      }
   
      console.log("The file was saved!");
  });
  }
function carpetas(){
  try {
    fs.mkdirSync('view')
    fs.mkdirSync('controller')
    fs.mkdirSync('models')
    fs.mkdirSync('database')    
  } catch (error) {
    console.log('error 404')
  }

}
function archivos(){
    fs.writeFile("./view/index.html", `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Esp4a</title>
      <base href="/">
    
      <meta name="viewport" content="width=device-width, initial-scale=1">
    
    </head>
    <body>
        
    </body>
    </html>
    `, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("todo listo");
    });

fs.writeFile("./database/user.js",
 `const mongoose=require('mongoose')
//esquema de base de datos

const customerSchema=mongoose.Schema({
   
})
module.exports=mongoose.model('user',customerSchema)`, function (err) {
  if (err) {
      return console.log(err);
  }

  console.log("The file was saved!");
});
fs.writeFile("./controller/user.js", 
`'use strict'
const User =use('./model/User')

class userController {
 
  
}

module.exports = userController
`, function (err) {
if (err) {
    return console.log(err);
}

console.log("The file was saved!");
});

fs.writeFile("./models/user.js", 
`'use strict'

const Model = use('Model')

class User extends Model {
    
}

module.exports = User
`, function (err) {
  if (err) {
      return console.log(err);
  }

  console.log("The file was saved!");
});
}

program.parse(process.argv)