let express = require("express")
// npm install cors
let cors = require("cors")

const { Configuration, OpenAIApi } = require("openai");

let app = express()
app.use(cors())

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

function saludar(req, res) {
    res.json("hola soy el backend del profe")
}
function calcular(req, res) {
    let num1 = 5
    let num2 = 2
    let resultado = num1 + num2 + ''
    res.json(resultado)
}

function suma(req, res) {
    let num1 = +req.params.num1
    let num2 = +req.params.num2
    let resultado = num1 + num2
    res.send(resultado + "")
}


async function getPareja(req, res) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Im 22 and im not very atractive. I dont talk too much either. Give me advice on how to get a girlfriend",
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      });
      res.send(response.data.choices[0].text)
}
//http://127.0.0.1:3000/hola
//http://localhost:3000/hola
//(profe)     http://10.101.17.22:3000/hola
app.get("/hola", saludar)
app.get("/", calcular)

//http://localhost:3000/pareja
app.get("/pareja", getPareja)

http://localhost:3000/suma/4/3
app.get("/suma/:num1/:num2", suma)



app.listen(3000)
console.log('Servidor encendido y a la escucha en el puerto 3000')
