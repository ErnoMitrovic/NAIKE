// Author: Moisés Adame-Aguilar
// Date: February 24, 2023
// Description: Api handling through POST requests.

// Handler that generates an image.
async function buttonHandleGenerate(){
    // Query and image generated.
    const text = document.getElementById('input-text').value
    var image = document.getElementById('image-generated')

    // Response from the Api.
    response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: text
        })
    })
    .then(response => response.json())
    .then(response => image.setAttribute('src', response.message))
}

// Handler that edits an image.
async function buttonHandleEdit(){
    // Query and image generated.
    const text = document.getElementById('input-text').value
    var image = document.getElementById('image-generated')

    // Response from the Api.
    response = await fetch('http://localhost:3000/edit', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: text
        })
    })
    .then(response => response.json())
    .then(response => image.setAttribute('src', response.message))
}