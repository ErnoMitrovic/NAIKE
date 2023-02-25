async function buttonHandleGenerate(){
    const text = document.getElementById('input-text').value
    
    var image = document.getElementById('image-generated')
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

async function buttonHandleEdit(){
    // a pickup truck parked in front of the hotel
    const text = document.getElementById('input-text').value
    
    var image = document.getElementById('image-generated')
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