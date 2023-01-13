const assert = require("assert")
const lks = require("./src/Eval")
const parser =  require("./src/Parser")
const readLineSync = require('readline-sync');
const fs = require("fs");

if(process.argv[2] == null){
    let input = "";
    while(input != ":quit"){
        input = readLineSync.question("> ")
        console.log(lks.eval(parser.parse(input)))
    }
}else{
    console.log(lks.eval(parser.parse(fs.readFileSync(process.argv[2],"utf-8"))))
}