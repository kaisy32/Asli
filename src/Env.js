class Env {
    constructor(rec = {},p=null) {
        this.rec = rec
        this.p = p
    }
    // cria uma variavel com nome e valor 
    define(name,value) {
        this.rec[name] = value
        return value
    }
    //redefine o valor de uma variavel
    assign(name,value){
        this.res(name).rec[name] = value
        return value

    }

    //retorna o valor de uma variavel
    look(name){
        return this.res(name).rec[name]
    }
    //retorna o local de uma variavel definida
    res(name){
        if(this.rec.hasOwnProperty(name)){
            return this
        }
        if(this.p == null){
            throw new ReferenceError(`"${name}" não esta definido`)
       }
       return this.p.res(name)
    }
}
module.exports = Env
