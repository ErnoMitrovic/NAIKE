async function buttonHandle(){
    response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'prompt': 'dog' 
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}