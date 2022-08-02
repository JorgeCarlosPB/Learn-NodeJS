// const url = (window.location.hostname.includes('localhost'))
//                 ? 'http://localhost:8085/api/auth/'
//                 : 'http://restserver-webserver-node-jcpb.com/api/auth/'
const url = 'http://localhost:8085/api/auth/'
const miFormulario = document.querySelector('form')
miFormulario.addEventListener('submit', ev =>{
    ev.preventDefault()
    const formData= {}
    for(let el of miFormulario.elements){
        if(el.name.length > 0)
            formData[el.name] = el.value
    } 
    console.log(formData);

    fetch(url + 'login',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type':'application/json'}
    })
    .then(resp => resp.json())
    .then( ({msg, token}) =>{
        if(msg){
            return console.error(msg)
        }

        localStorage.setItem('token', token)
        window.location = 'chat.html'
    })
    .catch(err =>{
        console.log(err);
    })
})

function handleCredentialResponse(response) {
    //google token : ID_TOKEN
    // console.log('id_token',response.credential)
    const body = {id_token: response.credential}

    // const url = 'http://localhost:8085/api/auth' 

    fetch(url+'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    // .then(resp =>{
    //         console.log(resp)
    //         localStorage.setItem('email', resp.usuario.correo)
    //     })
    .then(({token})=>{
        // console.log(token);
        localStorage.setItem('token',token)
        window.location = 'chat.html'
    })
    .catch(console.warn)

}

const button = document.getElementById('google_signout')
button.onclick = () =>{
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'),done =>{
        localStorage.clear()
        location.reload()
    })
}