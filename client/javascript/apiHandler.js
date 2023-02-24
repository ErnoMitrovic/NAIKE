async function buttonHandle(){
    const text = document.getElementById('input-text').value
    
    var image = document.getElementById('image-generated')
    response = await fetch('http://localhost:3000', {
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