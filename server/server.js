import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config({
    path: "/Users/moymac/Library/Mobile\ Documents/com~apple~CloudDocs/Desktop/TEC\(CLOUD\)/ITC4/NAIKE/.env"
})

const configuration = new Configuration({
    apiKey: "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"
})

const openai = new OpenAIApi(configuration)

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello World',
    })
})

app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        })

        res.status(200).send({
            message: response.data.data[0].url,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            error
        })
    }
})

app.listen(3000, () => {console.log('Server runing on: http://localhost:3000')})