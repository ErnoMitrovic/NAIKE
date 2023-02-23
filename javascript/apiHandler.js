import { Configuration, OpenAIApi } from "./openai";
const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function responseButton(){
    var text = document.getElementById('input-text').innerText
    const response = await openai.createImage({
        prompt: text,
        n: 1,
        size: "1024x1024",
    });
    const image_url = response.data.data[0].url;

    console.log('== URL ==')
    console.log(image_url)
}