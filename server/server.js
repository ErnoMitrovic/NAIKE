// Author: Moisés Adame-Aguilar
// Date: February 24, 2023
// Description: ExpressJS server for post requests  
// regarding the creation or the editing of an image.

import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'
import * as fs from 'fs';
import { Configuration, OpenAIApi } from 'openai'

// Path for the Api Key.
dotenv.config({
    path: "../.env"
})

// Configuration for the api with the Api Key.
const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

// Defining the Api.
const openai = new OpenAIApi(configuration)

// Instantiating the expressJS app.
const app = express()
app.use(cors())
app.use(express.json())

// Post request for the creation of an image.
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

// Post request for editting an image.
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

// The server is listening on port 3000
app.listen(3000, () => {console.log('Server runing on: http://localhost:3000')})