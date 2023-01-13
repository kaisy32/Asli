const Env  = require("./Env")

class Eval {
    constructor(global = new Env() ) {
        this.global = global
    }
    eval(x,env = this.global) {
        //--------------------------------------------
        // constantes
        if(this.isNumber(x)){
            return x
        }
        if(this.isString(x)){
            return x.slice(1,-1)
        }
        //--------------------------------------------
        // aritimetica
        if (x[0] == "+"){
            return this.eval(x[1],env) + this.eval(x[2],env)
        }
        if (x[0] == "-"){
            return this.eval(x[1],env) - this.eval(x[2],env)
        }
        if (x[0] == "*"){
            return this.eval(x[1],env) * this.eval(x[2],env)
        }
        if (x[0] == "/"){
            return this.eval(x[1],env) / this.eval(x[2],env)
        }
        if (x[0] == "^"){
            return this.eval(x[1],env) ** this.eval(x[2],env)
        }
        //--------------------------------------------
        // operadores logicos
        if(x[0] === ">"){
                return this.eval(x[1],env) > this.eval(x[2],env)
        }
        if(x[0] === ">="){
                return this.eval(x[1],env) >= this.eval(x[2],env)
        }
        if(x[0] === "<"){
                return this.eval(x[1],env) < this.eval(x[2],env)
        }
        if(x[0] === "<="){
                return this.eval(x[1],env) <= this.eval(x[2],env)
        }
        if(x[0] === "=="){
                return this.eval(x[1],env) == this.eval(x[2],env)
        }
        if(x[0] === "!="){
                return this.eval(x[1],env) != this.eval(x[2],env)
        }
        // declaracao de variaveis
        if(x[0] === "let"){
            const [_,name,value] = x
            return env.define(name,this.eval(value,env))
        }
        //--------------------------------------------
        // atribuir valor
        if(x[0] == "set"){
            const [_,name,value] = x
            return env.assign(name,this.eval(value,env))
        }
        //--------------------------------------------
        //acessar variavel
        if(this.isVarName(x)){
            return env.look(x)
        }
        //--------------------------------------------
        // Blocos
        if(x[0] === "begin") {
            return this.evalBlock(x,new Env({},env))
        }
        //--------------------------------------------
        // if <condition>
        if(x[0] == "if"){
            let [t,cond,cons,inv] = x
            if(this.eval(cond,env)){
                return this.eval(cons,env)
            }
            return this.eval(inv,env)
        }
        //--------------------------------------------
        // loop while
        if(x[0] == "while"){
            const [t,cond,code] = x
            let z = null;
            while(this.eval(cond,env)){
                z = this.eval(code,env)
            }
            return z
        }
        //--------------------------------------------
        // Declaracao de funcao
        if(x[0] == "def") {
            const [t,n,p,b] = x
            const fn = {p,b,env}
            return env.define(n,fn)
        }
        //--------------------------------------------
        //  Listas
        if(x[0] == "list"){
            return x.slice(1)
        }      
        //--------------------------------------------
        // Funções anonimas  AKA lambda
        if(x[0] == "lambda"){
            const [tt,p,b] = x
            return {p,b,env}
            
        }
        //--------------------------------------------
        // Funcoes array
        //--------------------------------------------
        // Chamada de função
        if (Array.isArray(x)) {
            const fn = this.eval(x[0], env);
            const args = x.slice(1).map(i => this.eval(i, env));
            if (typeof fn === 'function') {
              return fn(...args)
            }
            return this.userFunction(fn,args) 
        }
        //--------------------------------------------   
        throw `sem implementação" ${JSON.stringify(x)}`
    }
    evalBlock = (x,y) => {
        let res_ 
        const [tag,...exprs] = x
        exprs.forEach(i => {
            res_ = this.eval(i,y)
        });
        return res_
    }
    evalBody = (x,y) => {
        if(x[0]=="begin"){
            return this.evalBlock(x,y)
        }
        return this.eval(x,y)
    }
    userFunction(fn,args){
        const actvRec = {}
            fn.p.forEach((i,j) => {
                actvRec[i] = args[j]
            })
            const actvEnv = new Env(actvRec,fn.env)
            return this.evalBody(fn.b,actvEnv)
    }
    isNumber  = (x) => typeof x === 'number'
    isString  = (x) => typeof x === 'string' && x[0] === '"' && x.slice(-1) === '"'
    isVarName = (x) => typeof x === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(x)

}

const lks = new Eval(new Env({
    null:null,
    true:true,
    false:false,
    print(...args){
        console.log(args)
    }
}))
module.exports = lks
