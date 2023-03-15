require('dotenv').config()

const openAIFactory = require('./openai/openaiFactory')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const hostname = process.env.HOSTNAME || 'localhost'
const port = process.env.PORT || '5000'
const apiKey = process.env.OPENAI_API_KEY

const app = express()
app.use(bodyParser.json())
app.use(cors())

const openai = openAIFactory.create()

app.get("/models", async (req, res) => {
    
    res.json({
        models: (await openai.api.listModels()).data
    })
})

app.post("/", async (req, res) => {
    const { message, currentModel } = req.body
    
    res.json({
        message: await openai.callApi(message, currentModel),
    })
})

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
    console.log(typeof(apiKey) === undefined ? 
        "Error: your OpenAI api key is undefined. See .env file" :
        "Your OpenAI api key is : " + apiKey)
})