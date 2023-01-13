const assert = require("assert")
const lks = require("./Eval")
const parser =  require("./Parser")

assert.strictEqual(lks.eval(2),2)
assert.strictEqual(lks.eval('"hallo"'),"hallo")

assert.strictEqual(lks.eval(["+",1,1]),2)
assert.strictEqual(lks.eval(["+",["^",3,2],1]),10)

assert.strictEqual(lks.eval(["let","xy",10]),10)
assert.strictEqual(lks.eval("xy"),10)
assert.strictEqual(lks.eval(["let","x",["+",5,["^",9,2]]]),86)
assert.strictEqual(lks.eval(["let","biggerThan","true"]),true)


//block
assert.strictEqual(lks.eval(["begin",
['let',"x",10],
['let',"y",20],
["+",["*","x","y"],30]
]),230)
//block - block
assert.strictEqual(lks.eval(
    ["begin",
        ["let","x",10],
        ["let","z", ["begin",
            ["let","k",["+","x",10]],
            "k"
        ]],"z"]),20)
//set
assert.strictEqual(lks.eval(
["begin",
    ["let","x",210],
    ["begin",["set","x",'"777"']],
    "x"]),"777")
//if
assert.strictEqual(lks.eval(
    ["begin",
        ["let","x",11],
        ["let","y",0],
        ["if",[">","x",10],
            ["set","y",20],
            ["set","y",30]],"y"]),20)
//while
assert.strictEqual(lks.eval(
    ['begin',

      ['let', 'i', 0],

      ['while', ['<', 'i', 1000],

        ['set', 'i', ['+', 'i', 1]],
      ],

      'i'

    ]),

  1000);
//lks.eval(["print",'"hello"'])
//console.log(lks.eval(parser.parse("(begin (let x 10) (let y 110) (+ x y) )")))
assert.strictEqual(lks.eval(parser.parse(
  `
    (begin 
      (def pow (x y)
        (* x y) )
        (pow 2 2))
  `)),4)
  assert.strictEqual(lks.eval(parser.parse(
    `
    ((lambda (x) (* x x)) 2)
    `)),4)
    assert.deepStrictEqual(lks.eval(parser.parse(
      `
      (let a (list 1 2 3 4 5))
      `)),[1,2,3,4,5])    
  console.log("no errors")
