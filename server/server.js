import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'
import * as fs from 'fs';
import { Configuration, OpenAIApi } from 'openai'

dotenv.config({
    path: "../.env"
})

const configuration = new Configuration({
    apiKey: process.env.API_KEY
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

app.post('/generate', async (req, res) => {
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

app.post('/edit', async (req, res) => {
    try{
        const prompt = req.body.prompt
        const response = await openai.createImageEdit(
            fs.createReadStream("imgs/original.png"),
            fs.createReadStream("imgs/mask.png"),
            prompt,
            1,
            "1024x1024"
        )

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